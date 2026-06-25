// Local knowledge base for the TimeTravel Agency assistant.
// No external API: replies are produced by matching the visitor's message
// against the keyword sets below. Tone: professional, warm, history-loving
// and elegant.

// Normalises text for matching: lowercase + removes accents and punctuation.
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Each intent exposes keywords (already accent-free) and a response builder.
// Intents are ordered from most specific to most general so the first match
// wins.
export const intents = [
  // ---- Destinations -------------------------------------------------------
  {
    id: "paris-1889",
    keywords: [
      "paris",
      "1889",
      "belle epoque",
      "tour eiffel",
      "eiffel",
      "exposition universelle",
    ],
    response:
      "Ah, Paris 1889 — un de mes voyages favoris ! Vous arrivez en pleine Belle Époque, au moment exact où la Tour Eiffel est dévoilée au monde lors de l'Exposition Universelle. Imaginez les premières lumières électriques, les pavillons internationaux sur le Champ-de-Mars et l'effervescence des cafés littéraires. Comptez 2 900 € par voyageur, tout inclus, pour 5 jours / 4 nuits dans un confort absolu.",
  },
  {
    id: "florence-1504",
    keywords: [
      "florence",
      "1504",
      "renaissance",
      "michel ange",
      "michel-ange",
      "michelange",
      "david",
      "leonard",
      "vinci",
      "de vinci",
      "architecture",
    ],
    response:
      "Florence 1504, le cœur battant de la Renaissance ! Vous assisterez au dévoilement du David de Michel-Ange et pourrez croiser Léonard de Vinci dans les ateliers de la ville. Coupoles, fresques, perspectives parfaites : l'architecture y atteint un sommet d'élégance. Ce voyage est proposé à 3 500 € par voyageur, tout inclus.",
  },
  {
    id: "cretace",
    keywords: [
      "cretace",
      "dinosaure",
      "dinosaures",
      "prehistoire",
      "prehistorique",
      "jurassique",
      "faune",
      "nature sauvage",
      "65m",
    ],
    response:
      "Le Crétacé, pour les âmes les plus aventureuses ! À -65 millions d'années, vous observerez les dinosaures dans une nature vierge et indomptée, entourés d'une faune et d'une flore d'une beauté brute. C'est notre expédition la plus extrême, encadrée par des chrono-guides experts, à 6 200 € par voyageur.",
  },

  // ---- FAQ ----------------------------------------------------------------
  {
    id: "prix",
    keywords: [
      "prix",
      "tarif",
      "cout",
      "combien ca coute",
      "coute",
      "budget",
      "cher",
      "euros",
    ],
    response:
      "Voici nos tarifs, tout compris (transfert temporel sécurisé, chrono-guide et équipement d'époque) :\n• Paris 1889 — 2 900 € / voyageur\n• Florence 1504 — 3 500 € / voyageur\n• Crétacé -65M — 6 200 € / voyageur\nSouhaitez-vous des détails sur l'une de ces époques ?",
  },
  {
    id: "choisir",
    keywords: [
      "quelle destination",
      "quel voyage",
      "choisir",
      "conseiller",
      "recommander",
      "recommandation",
      "suggerer",
      "laquelle",
      "ou aller",
    ],
    response:
      "Avec plaisir ! Tout dépend de votre tempérament :\n• Pour le romantisme et le raffinement → Paris 1889.\n• Pour l'art et le génie humain → Florence 1504.\n• Pour le frisson et la nature brute → le Crétacé.\nDites-moi ce qui vous fait rêver et je vous guiderai vers l'époque idéale.",
  },
  {
    id: "securite",
    keywords: [
      "sur",
      "surs",
      "securite",
      "securise",
      "danger",
      "dangereux",
      "risque",
      "risques",
      "garanti",
    ],
    response:
      "Votre sécurité est notre priorité absolue. Chaque expédition suit des protocoles temporels certifiés, avec un chrono-guide privé, un équipement d'époque et une assurance retour garanti. Nos voyageurs reviennent toujours à bon port — et avec des souvenirs inoubliables.",
  },
  {
    id: "duree",
    keywords: [
      "duree",
      "combien de temps",
      "dure",
      "jours",
      "longtemps",
      "nuits",
    ],
    response:
      "Chaque voyage est pensé pour une immersion complète sans fatigue : Paris 1889 dure 5 jours / 4 nuits, Florence 1504 6 jours / 5 nuits, et le Crétacé 3 jours / 2 nuits. Le temps passé dans le passé n'affecte en rien votre époque d'origine.",
  },
  {
    id: "famille",
    keywords: [
      "famille",
      "enfant",
      "enfants",
      "groupe",
      "couple",
      "plusieurs",
      "voyager a plusieurs",
    ],
    response:
      "Bien sûr ! La plupart de nos expéditions se vivent merveilleusement en famille ou en groupe. Paris 1889 et Florence 1504 conviennent à tous les âges. Le Crétacé, plus intense, est réservé aux voyageurs avertis. Indiquez-moi le nombre de voyageurs et je vous prépare une suggestion.",
  },
  {
    id: "reserver",
    keywords: [
      "reserver",
      "reservation",
      "reserve",
      "booking",
      "comment reserver",
      "s inscrire",
      "inscription",
      "commander",
    ],
    response:
      "Rien de plus simple : rendez-vous sur la page Réservation, choisissez votre époque, le nombre de voyageurs et la date de départ, puis confirmez. Notre équipe vous recontacte pour finaliser votre expédition. Souhaitez-vous que je vous recommande une destination avant de réserver ?",
  },

  // ---- Conversation -------------------------------------------------------
  {
    id: "salutation",
    keywords: [
      "bonjour",
      "salut",
      "bonsoir",
      "coucou",
      "hello",
      "hey",
      "bonne journee",
    ],
    response:
      "Bonjour et bienvenue chez TimeTravel Agency ! Je suis Chronos, votre assistant de voyage temporel. Quelle époque vous fait rêver aujourd'hui ?",
  },
  {
    id: "remerciement",
    keywords: ["merci", "super", "genial", "parfait", "top", "cool"],
    response:
      "Avec grand plaisir ! C'est toujours un bonheur de partager ma passion pour l'Histoire. Y a-t-il autre chose que je puisse faire pour préparer votre voyage ?",
  },
  {
    id: "aurevoir",
    keywords: ["au revoir", "bye", "a bientot", "ciao", "adieu", "bonne nuit"],
    response:
      "À très bientôt, et que vos voyages à travers le temps soient mémorables ! Je reste à votre disposition pour toute question.",
  },
];

// Message shown automatically when the chat opens.
export const welcomeMessage =
  "Bonjour, je suis Chronos, votre assistant TimeTravel ✨ Posez-moi vos questions sur nos époques (Paris 1889, Florence 1504, Crétacé), les prix, la sécurité ou la réservation.";

// Quick-reply suggestions offered to the visitor.
export const quickReplies = [
  "Quelle destination choisir ?",
  "Quel est le prix ?",
  "Les voyages sont-ils sûrs ?",
  "Comment réserver ?",
];

// Fallback used when no intent matches.
const fallback =
  "Excellente question ! Je peux vous renseigner sur nos trois époques — Paris 1889, Florence 1504 et le Crétacé — ainsi que sur les prix, la durée, la sécurité, les voyages en famille et la réservation. Sur quoi puis-je éclairer votre curiosité ?";

// Returns the best matching response for a given user message.
export function getBotResponse(message) {
  const text = normalize(message);
  if (!text) return fallback;

  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (text.includes(keyword)) {
        // Longer keywords are more specific, so weight them higher.
        score += keyword.includes(" ") ? 3 : 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return best ? best.response : fallback;
}
