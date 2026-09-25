import { akeniImages } from "@/assets/images"

const assignedAkeniNumbers = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
])

function getAkeniImage(number: number) {
  const image = akeniImages.find((item) => item.number === number)

  if (!image) {
    throw new Error(`Missing Akeni image ${number}`)
  }

  return image.src
}

function getAkeniTitle(number: number) {
  const image = akeniImages.find((item) => item.number === number)

  if (!image) {
    throw new Error(`Missing Akeni image ${number}`)
  }

  return image.title
}

export type ArtworkCategory =
  | "paintings"
  | "sculptures"
  | "mixed-media"
  | "portraits"
  | "public-art"
  | "contemporary-works"
  | "collections"

export type Artwork = {
  id: number | string
  slug: string
  title: string
  year: string
  category: ArtworkCategory
  medium: string
  dimensions: string
  status: string
  src: string
  alt: string
  excerpt: string
  story: string[]
  process: string[]
  published?: boolean
  imageKey?: string
}

export const artworkCategories: {
  label: string
  value: "all" | ArtworkCategory
}[] = [
  { label: "All Works", value: "all" },
  { label: "Paintings", value: "paintings" },
  { label: "Sculptures", value: "sculptures" },
  { label: "Mixed Media", value: "mixed-media" },
  { label: "Portraits", value: "portraits" },
  { label: "Public Art", value: "public-art" },
  { label: "Contemporary Works", value: "contemporary-works" },
  { label: "Collections", value: "collections" },
]

const featuredArtworks: Artwork[] = [
  {
    id: 1,
    slug: "shattered-resilience",
    title: getAkeniTitle(14),
    year: "2026",
    category: "paintings",
    medium: "Heavy-body oil impasto, cold leaf, wax medium",
    dimensions: "48 x 60 in",
    status: "Available",
    src: getAkeniImage(14),
    alt: "Akeni figurative painting with a seated woman and floral background",
    excerpt:
      "A meditation on pressure, repair, and the luminous marks left by survival.",
    story: [
      "This work follows a face as it becomes both surface and terrain, letting fractures read as evidence of endurance rather than collapse.",
      "Gold leaf moves through the composition like a quiet current, catching light where the darker passages feel most compressed.",
    ],
    process: [
      "Layered oil glazes",
      "Cold leaf hand-applied over textured ground",
      "Finished with satin archival varnish",
    ],
  },
  {
    id: 2,
    slug: "red-weather",
    title: getAkeniTitle(7),
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, mineral pigment, graphite",
    dimensions: "54 x 40 in",
    status: "Available",
    src: getAkeniImage(7),
    alt: "Akeni blue and green portrait painting with a draped figure",
    excerpt:
      "An atmospheric field of color where memory breaks open into movement.",
    story: [
      "Built from sweeping stains and sharp red interruptions, the painting imagines emotion as a climate system passing through the body.",
      "The teal ground gives the piece distance while the red linework pulls the viewer back into its charged center.",
    ],
    process: [
      "Poured acrylic washes",
      "Hand-scored graphite marks",
      "Matte mineral surface finish",
    ],
  },
  {
    id: 3,
    slug: "after-the-thaw",
    title: getAkeniTitle(9),
    year: "2025",
    category: "public-art",
    medium: "Digital painting, archival pigment print",
    dimensions: "36 x 36 in",
    status: "Editioned",
    src: getAkeniImage(9),
    alt: "Akeni studio painting of a seated woman in front of a floral scene",
    excerpt:
      "A lone figure stands inside a vast passage of stone, snow, and sky.",
    story: [
      "The landscape is composed as a threshold, with the central figure caught between retreat and arrival.",
      "Soft mountain light opens the scene, creating a moment that feels contemplative rather than triumphant.",
    ],
    process: [
      "Digital plein-air study",
      "Archival pigment print",
      "Signed edition of 20",
    ],
  },
  {
    id: 4,
    slug: "ashen-figure",
    title: getAkeniTitle(3),
    year: "2026",
    category: "paintings",
    medium: "Ink, charcoal, acrylic on canvas",
    dimensions: "42 x 58 in",
    status: "Available",
    src: getAkeniImage(3),
    alt: "Akeni portrait painting of a smiling child",
    excerpt:
      "A figure assembled from gesture, shadow, and sudden white silence.",
    story: [
      "This piece leans into incompletion, allowing the body to appear through splatter, erasure, and the friction of dry brushwork.",
      "Its restrained palette keeps attention on posture and pressure, making the figure feel both monumental and unstable.",
    ],
    process: [
      "Charcoal underdrawing",
      "Ink splatter and lifted acrylic",
      "Raw canvas edge treatment",
    ],
  },
  {
    id: 5,
    slug: "quiet-gold",
    title: getAkeniTitle(4),
    year: "2025",
    category: "portraits",
    medium: "Oil, plaster, metallic pigment",
    dimensions: "30 x 44 in",
    status: "Private collection",
    src: getAkeniImage(4),
    alt: "Akeni figurative artwork photographed in the studio",
    excerpt:
      "A smaller interior-scale study of rupture, reflection, and restraint.",
    story: [
      "Designed for intimate viewing, the composition uses deep negative space to make the metallic lines feel almost architectural.",
      "The face is held back from full recognition, leaving the viewer with texture, weight, and a quiet glint of warmth.",
    ],
    process: [
      "Plaster relief ground",
      "Oil scumble layers",
      "Metallic pigment detailing",
    ],
  },
  {
    id: 6,
    slug: "minor-monument",
    title: getAkeniTitle(5),
    year: "2024",
    category: "sculptures",
    medium: "Photographic study of carved form",
    dimensions: "24 x 36 in",
    status: "Available",
    src: getAkeniImage(5),
    alt: "Akeni artwork photographed as a studio progress image",
    excerpt:
      "A sculptural study that treats stillness as a kind of emotional architecture.",
    story: [
      "The work borrows the language of studio sculpture and translates it into a flat image with strong tonal contrast.",
      "Its body reads as a form under pressure, turned inward but not defeated.",
    ],
    process: [
      "Studio lighting study",
      "Charcoal print toning",
      "Deckled archival paper",
    ],
  },
  {
    id: 7,
    slug: "valley-witness",
    title: getAkeniTitle(6),
    year: "2025",
    category: "contemporary-works",
    medium: "Digital matte painting",
    dimensions: "40 x 50 in",
    status: "Available",
    src: getAkeniImage(6),
    alt: "Akeni figurative artwork with expressive color",
    excerpt:
      "A cinematic terrain study about scale, solitude, and returning light.",
    story: [
      "Rock, water, and sky are arranged to dwarf the figure without making them disappear.",
      "The composition is meant to feel like a held breath before a decision.",
    ],
    process: [
      "Layered digital brushwork",
      "Atmospheric color pass",
      "Large-format giclee print",
    ],
  },
  {
    id: 8,
    slug: "signal-bloom",
    title: getAkeniTitle(8),
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, ink, resin on panel",
    dimensions: "38 x 38 in",
    status: "Available",
    src: getAkeniImage(8),
    alt: "Akeni painting with a seated figure and soft studio light",
    excerpt:
      "A burst of red cuts through cool fields like a message arriving late.",
    story: [
      "The painting began as a series of controlled pours, then shifted into a more volatile map of interruptions.",
      "Its surface rewards close viewing, with small scratches and pigment pools working against the larger bloom.",
    ],
    process: [
      "Acrylic pour foundation",
      "Ink line intervention",
      "Thin resin sealing coat",
    ],
  },
  {
    id: 9,
    slug: "nocturne-mask",
    title: getAkeniTitle(10),
    year: "2025",
    category: "portraits",
    medium: "Oil, alkyd, gold pigment",
    dimensions: "36 x 48 in",
    status: "Available",
    src: getAkeniImage(10),
    alt: "Akeni vertical portrait artwork",
    excerpt:
      "A nocturnal portrait study where ornament becomes evidence.",
    story: [
      "The dark passages hold the face almost closed, while gold gestures pull its structure into visibility.",
      "It is a portrait less concerned with likeness than with the trace of repair.",
    ],
    process: [
      "Oil and alkyd layering",
      "Palette knife texture",
      "Gold pigment glazing",
    ],
  },
  {
    id: 10,
    slug: "white-noise-body",
    title: getAkeniTitle(11),
    year: "2026",
    category: "paintings",
    medium: "Acrylic ink, charcoal, gesso",
    dimensions: "44 x 56 in",
    status: "Available",
    src: getAkeniImage(11),
    alt: "Akeni panoramic mural with bright abstract forms",
    excerpt:
      "A body emerging from static, motion, and deliberate visual interruption.",
    story: [
      "The piece treats the figure as something that can be tuned into, rather than immediately seen.",
      "Splattered blacks and open whites create a tense rhythm between exposure and concealment.",
    ],
    process: [
      "Gesso-resist marks",
      "Acrylic ink washes",
      "Compressed charcoal finishing",
    ],
  },
  {
    id: 11,
    slug: "room-for-sky",
    title: getAkeniTitle(12),
    year: "2024",
    category: "collections",
    medium: "Archival pigment print",
    dimensions: "28 x 28 in",
    status: "Editioned",
    src: getAkeniImage(12),
    alt: "Akeni mural detail with city and coastal imagery",
    excerpt:
      "A calm landscape edition built for quiet rooms and long looking.",
    story: [
      "This edition crops the wider valley study into a square, emphasizing atmosphere over destination.",
      "The open sky gives the image a meditative stillness suited to interior placement.",
    ],
    process: [
      "Color-calibrated print",
      "Cotton rag paper",
      "Signed edition of 30",
    ],
  },
  {
    id: 12,
    slug: "red-current",
    title: getAkeniTitle(13),
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, oil stick, pigment",
    dimensions: "50 x 32 in",
    status: "Available",
    src: getAkeniImage(13),
    alt: "Akeni colorful interior mural photographed on a staircase",
    excerpt:
      "An abstract work about momentum, resistance, and sudden heat.",
    story: [
      "The red gesture moves through the work as if it is searching for an exit.",
      "Cooler passages slow the eye down, turning the image into a push and pull between release and restraint.",
    ],
    process: [
      "Oil-stick drawing",
      "Pigment wash buildup",
      "Soft buffed surface",
    ],
  },
  {
    id: 13,
    slug: "ceremonial-ascent",
    title: getAkeniTitle(1),
    year: "2025",
    category: "collections",
    medium: "Archival study, pigment print",
    dimensions: "32 x 42 in",
    status: "Available",
    src: getAkeniImage(1),
    alt: "Akeni colorful interior mural with abstract transportation imagery",
    excerpt:
      "A layered figurative study of movement, elevation, and collective ritual.",
    story: [
      "The composition gathers bodies, fabric, and atmosphere into a scene that feels ceremonial without becoming static.",
      "Its upward rhythm gives the work a sense of passage, as if memory is being lifted into public view.",
    ],
    process: [
      "Archival source study",
      "Pigment print preparation",
      "Warm tonal grading",
    ],
  },
  {
    id: 14,
    slug: "civic-figure-study",
    title: getAkeniTitle(2),
    year: "2026",
    category: "sculptures",
    medium: "Sculptural reference study",
    dimensions: "40 x 52 in",
    status: "Studio archive",
    src: getAkeniImage(2),
    alt: "Akeni vertical artwork image with a figure study",
    excerpt:
      "A monumental figure study exploring posture, dignity, and public presence.",
    story: [
      "This work studies the body as a public symbol, balancing formal stillness with emotional weight.",
      "Its scale and verticality suggest how sculpture can hold civic memory inside a physical place.",
    ],
    process: [
      "Form and gesture study",
      "Stone surface reference",
      "Monument scale planning",
    ],
  },
  {
    id: 15,
    slug: "vault-of-figures",
    title: getAkeniTitle(15),
    year: "2025",
    category: "contemporary-works",
    medium: "Historic image study, archival pigment",
    dimensions: "44 x 44 in",
    status: "Available",
    src: getAkeniImage(15),
    alt: "Akeni artwork photographed in a studio setting",
    excerpt:
      "A dense image of bodies, architecture, and motion arranged like a visual archive.",
    story: [
      "The work treats the image plane like a vault, preserving fragments of bodies, gestures, and symbolic architecture.",
      "Its crowded composition rewards slow looking, with each passage opening into another small drama.",
    ],
    process: [
      "High-resolution archival print",
      "Detail restoration pass",
      "Cotton rag paper finish",
    ],
  },
  {
    id: 16,
    slug: "river-procession",
    title: getAkeniTitle(16),
    year: "2024",
    category: "public-art",
    medium: "Mural concept study",
    dimensions: "36 x 48 in",
    status: "Concept",
    src: getAkeniImage(16),
    alt: "Akeni compact portrait painting photographed close up",
    excerpt:
      "A public-art concept where landscape becomes a stage for procession and memory.",
    story: [
      "Built around movement through landscape, the piece imagines public art as a journey rather than a fixed image.",
      "The river works as a visual guide, pulling people, architecture, and atmosphere into one shared path.",
    ],
    process: [
      "Mural composition study",
      "Site adaptation notes",
      "Color and scale exploration",
    ],
  },
  {
    id: 17,
    slug: "studio-portrait-light",
    title: getAkeniTitle(17),
    year: "2026",
    category: "portraits",
    medium: "Portrait study, oil reference",
    dimensions: "30 x 45 in",
    status: "Available",
    src: getAkeniImage(17),
    alt: "Akeni artwork with expressive portrait detail",
    excerpt:
      "A portrait study focused on quiet expression, skin tone, and directional light.",
    story: [
      "The sitter is held in a soft field of light, giving the portrait a mood of reflection rather than performance.",
      "Small tonal shifts shape the face and allow presence to emerge gradually.",
    ],
    process: [
      "Portrait lighting study",
      "Layered tonal mapping",
      "Soft glaze finish",
    ],
  },
  {
    id: 18,
    slug: "gold-ground-memory",
    title: getAkeniTitle(18),
    year: "2025",
    category: "mixed-media",
    medium: "Archival image, pigment, surface texture",
    dimensions: "34 x 46 in",
    status: "Available",
    src: getAkeniImage(18),
    alt: "Akeni artwork photographed from a horizontal angle",
    excerpt:
      "A warm surface study where historic imagery becomes texture, atmosphere, and memory.",
    story: [
      "This piece uses golden tonal passages to make the image feel recovered from time rather than newly made.",
      "Its surface language connects archival memory with the tactile concerns of the studio.",
    ],
    process: [
      "Pigment surface treatment",
      "Archival reference layering",
      "Gold-toned color pass",
    ],
  },
  {
    id: 19,
    slug: "threshold-figure",
    title: getAkeniTitle(19),
    year: "2026",
    category: "paintings",
    medium: "Oil study on canvas",
    dimensions: "36 x 48 in",
    status: "Available",
    src: getAkeniImage(19),
    alt: "Akeni artwork with warm portrait tones",
    excerpt:
      "A vertical figure study about arrival, silence, and the tension of standing still.",
    story: [
      "The figure occupies the image like a threshold, neither fully entering nor leaving the pictorial space.",
      "Texture and muted color give the work a quiet tension that sits between portrait and symbol.",
    ],
    process: [
      "Oil study foundation",
      "Dry-brush surface build",
      "Muted glaze treatment",
    ],
  },
]

const categoryRotation: ArtworkCategory[] = [
  "paintings",
  "portraits",
  "mixed-media",
  "public-art",
  "contemporary-works",
  "collections",
  "sculptures",
]

const additionalAkeniArtworks: Artwork[] = akeniImages
  .filter((image) => !assignedAkeniNumbers.has(image.number))
  .map((image, index) => {
    const category = categoryRotation[index % categoryRotation.length]
    const paddedNumber = String(image.number).padStart(2, "0")

    return {
      id: featuredArtworks.length + index + 1,
      slug: `akeni-study-${paddedNumber}`,
      title: image.title,
      year: "2026",
      category,
      medium: "Artwork and studio documentation",
      dimensions: "Variable dimensions",
      status: "Studio archive",
      src: image.src,
      alt: image.alt,
      excerpt:
        "A selected Akeni image from the studio archive, presented as part of the full artwork collection.",
      story: [
        "This image extends the archive of Akeni works shown across the site.",
        "It is included to give visitors a fuller view of the artist's range, studio process, and finished pieces.",
      ],
      process: [
        "Studio archive image",
        "Artwork documentation",
        "Curated collection sequence",
      ],
    }
  })

export const artworks: Artwork[] = [
  ...featuredArtworks,
  ...additionalAkeniArtworks,
]

export function getArtworkBySlug(slug: string | undefined) {
  return artworks.find((artwork) => artwork.slug === slug)
}

export function getArtworksByCategory(category: "all" | ArtworkCategory) {
  if (category === "all") {
    return artworks
  }

  return artworks.filter((artwork) => artwork.category === category)
}
