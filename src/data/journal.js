export const articles = [
  {
    slug: "material-dialogue",
    title: "Material Dialogue",
    subtitle: "On letting surfaces speak before the designer does",
    date: "March 2024",
    category: "Philosophy",
    readTime: "6 min read",
    hero: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80&auto=format&fit=crop",
    excerpt: "Every material carries a biography. Travertine remembers the sea. Oak remembers the forest canopy. The designer's role is not to impose a narrative but to listen for the one the material already wants to tell.",
    body: [
      "Every material carries a biography. Travertine remembers the sea. Oak remembers the forest canopy. Hand-forged iron remembers the anvil. The designer's role is not to impose a narrative onto these surfaces but to listen carefully for the story they already want to tell.",
      "At Montaigne Design, we begin each project not with mood boards or Pinterest collections but with material samples. We lay them on a table in natural light. We touch them. We observe how they age across a single afternoon as the sun moves. This ritual is not performative — it is diagnostic.",
      "The conversation between materials is the invisible architecture of any room. A polished marble floor set against rough plaster walls creates a tension that the eye resolves as sophistication. Warm timber placed beside cold steel produces a comfort that neither material achieves alone. These dialogues are the true medium of interior design.",
      "Our approach demands patience. We often reject the first specification and return to the quarry, the mill, or the forge. We seek the piece that carries the right imperfection — the vein in marble that draws the eye towards a window, the grain in oak that echoes the curve of a staircase. Perfection in our work is not the absence of irregularity but the curation of it.",
      "Clients sometimes ask why we spend so much time on material selection when the layout and spatial planning seem more consequential. The answer is that materials outlast trends. A room's proportions may be altered by future owners. Its furniture will certainly change. But the stone on its floor, the plaster on its walls, the wood on its ceiling — these are the constants. They deserve the most considered attention we can give them.",
    ],
  },
  {
    slug: "light-as-architecture",
    title: "Light as Architecture",
    subtitle: "How illumination shapes space more than walls ever could",
    date: "January 2024",
    category: "Craft",
    readTime: "5 min read",
    hero: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80&auto=format&fit=crop",
    excerpt: "Light is the only building material that weighs nothing. Yet it defines volume, creates atmosphere, and directs movement more powerfully than any physical partition.",
    body: [
      "Light is the only building material that weighs nothing. Yet it defines volume, creates atmosphere, and directs human movement more powerfully than any physical partition. A corridor bathed in warm downlight feels intimate. The same corridor under cool fluorescence feels institutional. The walls have not moved. Only the light has changed.",
      "In our Dubai projects, we work with a paradox: the region's most abundant natural resource — sunlight — is also its most aggressive. Unfiltered Gulf sun bleaches fabrics, overheats surfaces, and flattens spatial depth. Our task is to transform this raw material into something inhabitable.",
      "We achieve this through layered filtration. Perforated metal screens cast geometric shadow patterns that shift throughout the day. Deep window reveals create graduated thresholds between exterior brilliance and interior calm. Translucent stone panels — typically backlit onyx or alabaster — glow with a warmth that electric light cannot replicate.",
      "Artificial lighting is composed in musical terms. We speak of crescendos in entry halls, diminuendos in bedrooms, and staccato accents along gallery walls. Every luminaire is individually dimmed and tuned to a specific colour temperature. The goal is an environment where the inhabitant never consciously notices the lighting yet feels instinctively at ease.",
      "The best compliment we receive is silence. When a client walks into a completed room and simply exhales, we know the light is right.",
    ],
  },
  {
    slug: "beyond-east-meets-west",
    title: "Beyond East Meets West",
    subtitle: "Why cultural fusion requires more than surface borrowing",
    date: "November 2023",
    category: "Culture",
    readTime: "7 min read",
    hero: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=80&auto=format&fit=crop",
    excerpt: "The phrase 'East meets West' has become a cliché that flattens both traditions. Genuine cultural synthesis in design requires studying principles, not just borrowing motifs.",
    body: [
      "The phrase 'East meets West' has become a marketing cliché that flattens both traditions into interchangeable ornamental sources. A Ming-dynasty side table next to a Le Corbusier chaise does not constitute cultural dialogue. It is proximity masquerading as synthesis.",
      "With studios in Dubai, Shanghai, and Paris, Montaigne Design operates at the intersection of multiple design traditions. Our founder Cathy Wang trained in classical Chinese aesthetics before studying at the École des Beaux-Arts. This dual formation taught her that genuine cultural synthesis requires studying principles, not just borrowing motifs.",
      "Chinese spatial philosophy organises rooms around the concept of qi flow — the unimpeded circulation of energy through a space. French classical design structures rooms along axes of symmetry that guide the eye toward focal points. These are not contradictory principles. In our best work, they reinforce each other: axial clarity provides the bones, while qi-sensitive furniture placement ensures the room breathes.",
      "Arabian design introduces a third vocabulary: the interplay of density and void, of richly ornamented surfaces surrounding austere courtyards. In our Dubai projects, we often create a single densely detailed element — an intricately carved screen, a mosaic threshold — that concentrates decorative energy in one location, allowing the surrounding spaces to rest in minimalist calm.",
      "The result is not fusion in the pop-cultural sense. It is a new language built from shared grammatical structures that exist across traditions: the human need for shelter, the pleasure of crafted surfaces, the psychology of light and shadow, the comfort of proportion.",
    ],
  },
  {
    slug: "invisible-design",
    title: "The Invisible Design",
    subtitle: "When the highest achievement is that no one notices the design at all",
    date: "September 2023",
    category: "Philosophy",
    readTime: "4 min read",
    hero: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1400&q=80&auto=format&fit=crop",
    excerpt: "The most successful interior design disappears. The occupant does not admire the room — they simply feel entirely themselves within it.",
    body: [
      "The most successful interior design disappears. The occupant does not admire the room — they simply feel entirely themselves within it. This is the paradox we pursue: investing thousands of hours of deliberate craft to produce an experience that feels effortless and inevitable.",
      "Invisible design begins with observation. Before we draw a single line, we study how our clients actually live. Not how they say they live, or how they aspire to live, but how they move through space when they are not performing for an audience. Where do they leave their keys? Which chair do they gravitate toward? Do they read standing or seated? These micro-behaviours are the true programme of the project.",
      "Technical invisibility requires equal rigour. Every switch, outlet, and air vent must be integrated so seamlessly that the eye passes over it. We use flush-mounted switches finished in the same material as the surrounding wall. Air diffusers are concealed within shadow gaps at ceiling junctions. Audio speakers disappear behind acoustically transparent fabric panels.",
      "The most invisible element of all is proportion. When a room's dimensions feel right — when the ceiling height relates correctly to the floor area, when the windows are placed at intervals that create a satisfying rhythm — the occupant experiences a profound but inarticulate sense of wellbeing. They cannot point to what is working. They only know that everything does.",
    ],
  },
];

export function getArticle(slug) {
  return articles.find(a => a.slug === slug) || null;
}
