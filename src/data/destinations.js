export const destinations = [
  {
    id: "paris-1889",
    name: "Paris 1889",
    era: "Belle Époque",
    year: "1889",
    tagline: "L'Exposition Universelle et la naissance d'une icône",
    shortDescription:
      "Assistez à l'inauguration de la Tour Eiffel au cœur de l'Exposition Universelle. Une époque de progrès, d'élégance et d'émerveillement.",
    description:
      "Plongez dans le Paris flamboyant de la Belle Époque. En 1889, la Ville Lumière dévoile au monde la Tour Eiffel, prouesse d'acier de 300 mètres, lors d'une Exposition Universelle qui célèbre le centenaire de la Révolution. Déambulez sur le Champ-de-Mars parmi les pavillons internationaux, savourez l'effervescence des cafés littéraires et laissez-vous porter par les premières lumières électriques de la ville.",
    price: 8900,
    duration: "5 jours / 4 nuits",
    rating: 4.9,
    difficulty: "Confort",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Inauguration de la Tour Eiffel",
      "Exposition Universelle de 1889",
      "Cafés et salons de la Belle Époque",
    ],
    color: "#D4AF37",
  },
  {
    id: "cretace-65m",
    name: "Crétacé -65M",
    era: "Ère préhistorique",
    year: "-65 000 000",
    tagline: "Face à face avec les géants d'un monde disparu",
    shortDescription:
      "Une expédition extrême au cœur d'une nature sauvage et indomptée, à l'âge d'or des dinosaures. Sensations garanties.",
    description:
      "Remontez 65 millions d'années en arrière, à la fin du Crétacé, lorsque les dinosaures régnaient en maîtres. Depuis nos capsules d'observation blindées, observez les troupeaux de Tricératops traverser des plaines luxuriantes, le vol des Quetzalcoatlus dans un ciel primitif et, si vous l'osez, le passage d'un Tyrannosaurus rex. Une immersion totale dans une nature préhistorique d'une beauté brute, réservée aux voyageurs en quête d'extrême.",
    price: 14500,
    duration: "3 jours / 2 nuits",
    rating: 4.8,
    difficulty: "Extrême",
    image:
      "https://images.unsplash.com/photo-1606856110002-d0991ce78250?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Observation des dinosaures",
      "Nature préhistorique intacte",
      "Expédition extrême encadrée",
    ],
    color: "#7FB069",
  },
  {
    id: "florence-1504",
    name: "Florence 1504",
    era: "Renaissance",
    year: "1504",
    tagline: "Au berceau de l'art, parmi les maîtres de la Renaissance",
    shortDescription:
      "Vivez l'effervescence artistique de Florence à son apogée et assistez au dévoilement du David de Michel-Ange.",
    description:
      "Bienvenue dans la Florence des Médicis, capitale mondiale de l'art et de la pensée. En 1504, la cité dévoile le David de Michel-Ange tandis que Léonard de Vinci esquisse ses plus grands chefs-d'œuvre. Parcourez les ateliers des maîtres, admirez l'architecture de Brunelleschi, flânez sur le Ponte Vecchio et imprégnez-vous de l'esprit d'une époque qui a redéfini la beauté, la science et l'humanisme.",
    price: 10200,
    duration: "6 jours / 5 nuits",
    rating: 5.0,
    difficulty: "Confort",
    image:
      "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564594985645-4427056e22e2?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Dévoilement du David de Michel-Ange",
      "Ateliers de la Renaissance",
      "Art et architecture florentine",
    ],
    color: "#C9A36B",
  },
];

export const getDestinationById = (id) =>
  destinations.find((destination) => destination.id === id);

export const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
