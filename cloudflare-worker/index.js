const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const publicCacheControl = "public, max-age=60, s-maxage=60, stale-while-revalidate=300";

function json(data, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...jsonHeaders, "Cache-Control": cacheControl },
  });
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function toArtwork(row, requestUrl) {
  const url = new URL(requestUrl);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    year: String(row.year),
    status: row.status,
    category: row.category,
    medium: row.medium,
    dimensions: row.dimensions,
    alt: row.alt,
    excerpt: row.excerpt,
    story: parseJson(row.story_json, []),
    process: parseJson(row.process_json, []),
    imageKey: row.image_key,
    src: row.image_key
      ? `${url.origin}/images/${row.image_key}`
      : "",
    published: Boolean(row.published),
  };
}

function base64UrlEncode(value) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value) {
  return atob(value.replace(/-/g, "+").replace(/_/g, "/"));
}

async function signSession(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

async function createSession(username, env) {
  const payload = `${username}.${Date.now() + 8 * 60 * 60 * 1000}`;
  const encodedPayload = base64UrlEncode(payload);
  const signature = await signSession(encodedPayload, env.ADMIN_PASSWORD);
  return `${encodedPayload}.${signature}`;
}

async function isAdmin(request, env) {
  if (!env.ADMIN_PASSWORD || !env.ADMIN_USERNAME) return false;

  const authorization = request.headers.get("Authorization") || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = await signSession(encodedPayload, env.ADMIN_PASSWORD);
  if (signature !== expectedSignature) return false;

  try {
    const [username, expiresAt] = base64UrlDecode(encodedPayload).split(".");
    return username === env.ADMIN_USERNAME && Number(expiresAt) > Date.now();
  } catch {
    return false;
  }
}

async function login(request, env) {
  const body = await request.json();
  const username = String(body.username || "");
  const password = String(body.password || "");

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return json({ error: "Invalid username or password" }, 401);
  }

  return json({ token: await createSession(username, env) });
}

async function getArtworks(request, env) {
  const result = await env.DB.prepare(
    "SELECT * FROM artworks WHERE published = 1 ORDER BY created_at DESC, title ASC"
  ).all();

  return json(
    { artworks: result.results.map((row) => toArtwork(row, request.url)) },
    200,
    publicCacheControl,
  );
}

async function getArtwork(request, env, slug) {
  const row = await env.DB.prepare(
    "SELECT * FROM artworks WHERE slug = ?1 AND published = 1 LIMIT 1"
  ).bind(slug).first();

  return row
    ? json({ artwork: toArtwork(row, request.url) }, 200, publicCacheControl)
    : json({ error: "Artwork not found" }, 404, publicCacheControl);
}

async function getSiteContent(env) {
  const row = await env.DB.prepare(
    "SELECT content_json FROM site_content WHERE id = 1 LIMIT 1"
  ).first();

  return row
    ? json({ content: parseJson(row.content_json, null) }, 200, publicCacheControl)
    : json({ error: "Site content has not been saved yet" }, 404, publicCacheControl);
}

async function saveArtwork(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const body = await request.json();
  const id = String(body.id || crypto.randomUUID());
  const title = String(body.title || "").trim();
  const slug = slugify(String(body.slug || title));

  if (!title || !slug) return json({ error: "A title is required" }, 400);

  const values = {
    id,
    slug,
    title,
    year: Number.parseInt(String(body.year || "0"), 10) || 0,
    status: String(body.status || "Available"),
    category: String(body.category || "paintings"),
    medium: String(body.medium || ""),
    dimensions: String(body.dimensions || ""),
    imageKey: String(body.imageKey || ""),
    alt: String(body.alt || title),
    excerpt: String(body.excerpt || ""),
    storyJson: JSON.stringify(Array.isArray(body.story) ? body.story : []),
    processJson: JSON.stringify(Array.isArray(body.process) ? body.process : []),
    published: body.published === false ? 0 : 1,
  };

  await env.DB.prepare(`
    INSERT INTO artworks (
      id, slug, title, year, status, category, medium, dimensions,
      image_key, alt, excerpt, story_json, process_json, published,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      slug = excluded.slug,
      title = excluded.title,
      year = excluded.year,
      status = excluded.status,
      category = excluded.category,
      medium = excluded.medium,
      dimensions = excluded.dimensions,
      image_key = excluded.image_key,
      alt = excluded.alt,
      excerpt = excluded.excerpt,
      story_json = excluded.story_json,
      process_json = excluded.process_json,
      published = excluded.published,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    values.id,
    values.slug,
    values.title,
    values.year,
    values.status,
    values.category,
    values.medium,
    values.dimensions,
    values.imageKey,
    values.alt,
    values.excerpt,
    values.storyJson,
    values.processJson,
    values.published,
  ).run();

  return json({ id: values.id, slug: values.slug }, 201);
}

async function getAdminArtworks(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const result = await env.DB.prepare(
    "SELECT * FROM artworks ORDER BY created_at DESC, title ASC"
  ).all();

  return json({ artworks: result.results.map((row) => toArtwork(row, request.url)) });
}

async function updateArtwork(request, env, id) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const body = await request.json();
  const current = await env.DB.prepare("SELECT * FROM artworks WHERE id = ?1 LIMIT 1").bind(id).first();
  if (!current) return json({ error: "Artwork not found" }, 404);

  const next = {
    ...current,
    ...body,
    slug: slugify(String(body.slug || body.title || current.title)),
  };

  await env.DB.prepare(`
    UPDATE artworks SET slug = ?, title = ?, year = ?, status = ?, category = ?,
      medium = ?, dimensions = ?, image_key = ?, alt = ?, excerpt = ?,
      story_json = ?, process_json = ?, published = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    next.slug,
    String(next.title || current.title),
    Number.parseInt(String(next.year || current.year), 10) || 0,
    String(next.status || current.status),
    String(next.category || current.category),
    String(next.medium || ""),
    String(next.dimensions || ""),
    String(next.imageKey || current.image_key || ""),
    String(next.alt || current.alt || next.title),
    String(next.excerpt || ""),
    JSON.stringify(Array.isArray(next.story) ? next.story : parseJson(current.story_json, [])),
    JSON.stringify(Array.isArray(next.process) ? next.process : parseJson(current.process_json, [])),
    next.published === false ? 0 : 1,
    id,
  ).run();

  return json({ updated: true });
}

async function deleteArtwork(request, env, id) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const row = await env.DB.prepare("SELECT image_key FROM artworks WHERE id = ?1 LIMIT 1").bind(id).first();
  if (!row) return json({ error: "Artwork not found" }, 404);

  await env.DB.prepare("DELETE FROM artworks WHERE id = ?1").bind(id).run();
  if (row.image_key) await env.ARTWORKS_BUCKET.delete(row.image_key);

  return json({ deleted: true });
}

async function saveSiteContent(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const body = await request.json();
  await env.DB.prepare(`
    INSERT INTO site_content (id, content_json, updated_at)
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      content_json = excluded.content_json,
      updated_at = CURRENT_TIMESTAMP
  `).bind(JSON.stringify(body.content || body)).run();

  return json({ saved: true });
}

async function ensureAdminPreferencesTable(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS admin_preferences (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      tour_completed INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function getAdminPreferences(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  await ensureAdminPreferencesTable(env);
  const row = await env.DB.prepare(
    "SELECT tour_completed FROM admin_preferences WHERE id = 1 LIMIT 1"
  ).first();

  return json({ tourCompleted: Boolean(row?.tour_completed) });
}

async function saveAdminPreferences(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const body = await request.json();
  await ensureAdminPreferencesTable(env);
  await env.DB.prepare(`
    INSERT INTO admin_preferences (id, tour_completed, updated_at)
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      tour_completed = excluded.tour_completed,
      updated_at = CURRENT_TIMESTAMP
  `).bind(body.tourCompleted === true ? 1 : 0).run();

  return json({ saved: true });
}

async function uploadImage(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Unauthorized" }, 401);

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return json({ error: "An image file is required" }, 400);
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `artworks/${crypto.randomUUID()}-${safeName}`;
  await env.ARTWORKS_BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  return json({ key }, 201);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: jsonHeaders });

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");

    try {
      if (path === "/api/auth/login" && request.method === "POST") {
        return login(request, env);
      }
      if (path === "/api/auth/session" && request.method === "GET") {
        return json({ authenticated: await isAdmin(request, env) });
      }
      if (path === "/api/admin/artworks" && request.method === "GET") {
        return getAdminArtworks(request, env);
      }
      if (path === "/api/artworks" && request.method === "GET") return getArtworks(request, env);
      if (path.startsWith("/api/artworks/") && request.method === "GET") {
        return getArtwork(request, env, decodeURIComponent(path.slice("/api/artworks/".length)));
      }
      if (path === "/api/artworks" && request.method === "POST") return saveArtwork(request, env);
      if (path.startsWith("/api/artworks/") && request.method === "PUT") {
        return updateArtwork(request, env, decodeURIComponent(path.slice("/api/artworks/".length)));
      }
      if (path.startsWith("/api/artworks/") && request.method === "DELETE") {
        return deleteArtwork(request, env, decodeURIComponent(path.slice("/api/artworks/".length)));
      }
      if (path === "/api/site-content" && request.method === "GET") return getSiteContent(env);
      if (path === "/api/site-content" && request.method === "PUT") return saveSiteContent(request, env);
      if (path === "/api/admin/preferences" && request.method === "GET") {
        return getAdminPreferences(request, env);
      }
      if (path === "/api/admin/preferences" && request.method === "PUT") {
        return saveAdminPreferences(request, env);
      }
      if (path === "/api/uploads" && request.method === "POST") return uploadImage(request, env);
      if (path.startsWith("/images/") && request.method === "GET") {
        const key = decodeURIComponent(path.slice("/images/".length));
        const object = await env.ARTWORKS_BUCKET.get(key);
        if (!object) return new Response("Not found", { status: 404 });
        return new Response(object.body, {
          headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
          },
        });
      }

      return json({ error: "Not found" }, 404);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Worker request failed" }, 500);
    }
  },
};
