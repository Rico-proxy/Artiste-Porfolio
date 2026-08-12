import image1 from "@/assets/images/image1.jpg"
import image10 from "@/assets/images/image10.webp"
import image11 from "@/assets/images/image11.webp"
import image2 from "@/assets/images/image2.webp"
import image3 from "@/assets/images/image3.webp"
import image4 from "@/assets/images/image4.webp"
import image5 from "@/assets/images/image5.webp"
import image6 from "@/assets/images/image6.webp"
import image7 from "@/assets/images/image7.webp"
import image8 from "@/assets/images/image8.webp"
import image9 from "@/assets/images/image9.webp"

export type ArtworkCategory =
  | "paintings"
  | "sculptures"
  | "mixed-media"
  | "portraits"
  | "public-art"
  | "contemporary-works"
  | "collections"

export type Artwork = {
  id: number
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

export const artworks: Artwork[] = [
  {
    id: 1,
    slug: "shattered-resilience",
    title: "Shattered Resilience",
    year: "2026",
    category: "paintings",
    medium: "Heavy-body oil impasto, cold leaf, wax medium",
    dimensions: "48 x 60 in",
    status: "Available",
    src: image4,
    alt: "Black and gold fractured portrait painting",
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
    title: "Red Weather",
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, mineral pigment, graphite",
    dimensions: "54 x 40 in",
    status: "Available",
    src: image2,
    alt: "Abstract red and teal expressionist artwork",
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
    title: "After the Thaw",
    year: "2025",
    category: "public-art",
    medium: "Digital painting, archival pigment print",
    dimensions: "36 x 36 in",
    status: "Editioned",
    src: image3,
    alt: "Painterly mountain landscape with lone figure",
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
    title: "Ashen Figure",
    year: "2026",
    category: "paintings",
    medium: "Ink, charcoal, acrylic on canvas",
    dimensions: "42 x 58 in",
    status: "Available",
    src: image1,
    alt: "Expressive black and white figure painting",
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
    title: "Quiet Gold",
    year: "2025",
    category: "portraits",
    medium: "Oil, plaster, metallic pigment",
    dimensions: "30 x 44 in",
    status: "Private collection",
    src: image4,
    alt: "Gold-veined dark portrait artwork",
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
    title: "Minor Monument",
    year: "2024",
    category: "sculptures",
    medium: "Photographic study of carved form",
    dimensions: "24 x 36 in",
    status: "Available",
    src: image1,
    alt: "Monochrome sculptural figure study",
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
    title: "Valley Witness",
    year: "2025",
    category: "contemporary-works",
    medium: "Digital matte painting",
    dimensions: "40 x 50 in",
    status: "Available",
    src: image3,
    alt: "Epic valley landscape artwork",
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
    title: "Signal Bloom",
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, ink, resin on panel",
    dimensions: "38 x 38 in",
    status: "Available",
    src: image2,
    alt: "Red and teal abstract bloom artwork",
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
    title: "Nocturne Mask",
    year: "2025",
    category: "portraits",
    medium: "Oil, alkyd, gold pigment",
    dimensions: "36 x 48 in",
    status: "Available",
    src: image4,
    alt: "Dark portrait with gold cracks",
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
    title: "White Noise Body",
    year: "2026",
    category: "paintings",
    medium: "Acrylic ink, charcoal, gesso",
    dimensions: "44 x 56 in",
    status: "Available",
    src: image1,
    alt: "Abstract figure in black and white",
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
    title: "Room for Sky",
    year: "2024",
    category: "collections",
    medium: "Archival pigment print",
    dimensions: "28 x 28 in",
    status: "Editioned",
    src: image3,
    alt: "Mountain landscape artwork with pale sky",
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
    title: "Red Current",
    year: "2026",
    category: "mixed-media",
    medium: "Acrylic, oil stick, pigment",
    dimensions: "50 x 32 in",
    status: "Available",
    src: image2,
    alt: "Abstract teal artwork with red energetic marks",
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
    title: "Ceremonial Ascent",
    year: "2025",
    category: "collections",
    medium: "Archival study, pigment print",
    dimensions: "32 x 42 in",
    status: "Available",
    src: image5,
    alt: "Historic figurative artwork with an ascending ceremonial composition",
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
    title: "Civic Figure Study",
    year: "2026",
    category: "sculptures",
    medium: "Sculptural reference study",
    dimensions: "40 x 52 in",
    status: "Studio archive",
    src: image6,
    alt: "Classical sculptural figure artwork study",
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
    title: "Vault of Figures",
    year: "2025",
    category: "contemporary-works",
    medium: "Historic image study, archival pigment",
    dimensions: "44 x 44 in",
    status: "Available",
    src: image7,
    alt: "Square classical artwork filled with figures and architectural drama",
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
    title: "River Procession",
    year: "2024",
    category: "public-art",
    medium: "Mural concept study",
    dimensions: "36 x 48 in",
    status: "Concept",
    src: image8,
    alt: "Classical landscape artwork with figures near water",
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
    title: "Studio Portrait Light",
    year: "2026",
    category: "portraits",
    medium: "Portrait study, oil reference",
    dimensions: "30 x 45 in",
    status: "Available",
    src: image9,
    alt: "Portrait artwork study with soft studio light",
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
    title: "Gold Ground Memory",
    year: "2025",
    category: "mixed-media",
    medium: "Archival image, pigment, surface texture",
    dimensions: "34 x 46 in",
    status: "Available",
    src: image10,
    alt: "Warm historical artwork study with gold and earth tones",
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
    title: "Threshold Figure",
    year: "2026",
    category: "paintings",
    medium: "Oil study on canvas",
    dimensions: "36 x 48 in",
    status: "Available",
    src: image11,
    alt: "Vertical artwork study with a central figure and textured surface",
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

export function getArtworkBySlug(slug: string | undefined) {
  return artworks.find((artwork) => artwork.slug === slug)
}

export function getArtworksByCategory(category: "all" | ArtworkCategory) {
  if (category === "all") {
    return artworks
  }

  return artworks.filter((artwork) => artwork.category === category)
}
