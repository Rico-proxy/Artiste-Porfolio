# Akeni Studio

Akeni Studio is a React website for an artist, sculptor, and designer.

## What It Includes

- Responsive public portfolio website
- Artwork gallery and artwork detail pages
- Hero carousel with the artist's images
- Homepage hero picker for choosing up to 7 featured artworks
- About, Projects, Kulukism, UAL Studios, Exhibitions, Press, and Contact pages
- Paginated artwork gallery with 10 artworks per page
- Light and dark mode
- Contact form using Web3Forms
- Admin dashboard for managing artworks and website text
- Image uploads to Cloudflare R2
- Artwork and text storage in Cloudflare D1

## Main Technology

- React, TypeScript, Vite, and Tailwind CSS
- shadcn-style UI components
- Vercel for the website
- Cloudflare Worker for the API
- Cloudflare D1 for text and artwork records
- Cloudflare R2 for images

Firebase is configured for possible future use, but the current content system uses Cloudflare.

## Run Locally

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run typecheck
npm run build
npm run lint
```

## Environment Variables

Create a `.env.local` file using `.env.example`.

Important values include:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
VITE_CLOUDFLARE_API_URL=https://your-worker.workers.dev
```

Firebase and R2 values are also listed in `.env.example`. Never commit real passwords, API secrets, or `.env.local`.

## Cloudflare Services

The project uses:

- Worker: `akeni-api`
- D1 database: `akeni-content`
- R2 bucket: `akeni-artworks`

The Worker handles:

- Admin login
- Artwork create, edit, publish, and delete actions
- Site text updates
- Image uploads
- Public artwork requests
- Serving images from R2

Worker bindings:

- `DB` connects to the D1 database
- `ARTWORKS_BUCKET` connects to the R2 bucket

Worker secrets:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

The Worker code is in [`cloudflare-worker/index.js`](cloudflare-worker/index.js).

## Dashboard

Open `/dashboard/login` to access the admin area.

The dashboard allows the owner to:

- Create and edit artworks
- Preview images locally, then upload them only when the artwork is saved
- Publish or hide artworks
- Delete artworks with confirmation
- Edit text for the public pages
- Choose artworks for Projects and Kulukism
- Choose the 7 homepage hero artworks from the Homepage dashboard page
- Browse dashboard artworks with pagination
- Guided dashboard tour with a replay button
- Reset site text to the original copy
- Change the website theme
- Sign out from the sidebar

The existing static artwork collection has already been imported into D1 and R2. The import page is available at `/dashboard/import-static` if it is ever needed again.

## Caching

- Images are cached for a long time because every new upload gets a new image URL.
- Public artwork and site text are cached briefly for faster repeat visits.
- Admin requests are not cached.
- Dashboard verification is cached in the current browser session until the 8-hour login token expires. Logout clears it.
- The dashboard tour completion is saved in Cloudflare and also remembered on the current device.
- A branded loading screen appears while the first artwork request is loading.

## Deployment

The frontend and Worker deploy separately.

For Cloudflare:

1. Update `cloudflare-worker/index.js`.
2. Deploy it to the `akeni-api` Worker.
3. Check the D1 and R2 bindings.

For Vercel:

1. Add the environment variables from `.env.local` to Vercel.
2. Confirm `VITE_CLOUDFLARE_API_URL` points to the Worker.
3. Redeploy the frontend.

The Worker does not need to be uploaded to Vercel.
