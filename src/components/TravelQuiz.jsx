import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw, Wand2 } from "lucide-react";
import { destinations, formatPrice } from "../data/destinations.js";

// Each option points to the destination id it favours. The destination with
// the most points at the end is recommended.
const questions = [
  {
    id: "experience",
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", value: "florence-1504" },
      { label: "Aventure et nature", value: "cretace-65m" },
      { label: "Élégance et raffinement", value: "paris-1889" },
    ],
  },
  {
    id: "period",
    question: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne, XIXe siècle", value: "paris-1889" },
      { label: "Temps préhistoriques", value: "cretace-65m" },
      { label: "Renaissance et classicisme", value: "florence-1504" },
    ],
  },
  {
    id: "ambiance",
    question: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", value: "paris-1889" },
      { label: "La nature sauvage", value: "cretace-65m" },
      { label: "L'art et l'architecture", value: "florence-1504" },
    ],
  },
  {
    id: "activity",
    question: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", value: "paris-1889" },
      { label: "Observer la faune", value: "cretace-65m" },
      { label: "Explorer des musées", value: "florence-1504" },
    ],
  },
];

// Personalised explanation shown with the recommended destination.
const explanations = {
  "paris-1889":
    "Votre goût pour l'élégance, l'effervescence urbaine et les grands monuments vous destine à la Belle Époque. Paris 1889 vous offrira le faste de l'Exposition Universelle et la magie de la Tour Eiffel naissante.",
  "cretace-65m":
    "Votre soif d'aventure et votre passion pour la nature brute appellent une expédition hors normes. Le Crétacé vous plongera au cœur d'un monde sauvage, face aux géants d'une époque disparue.",
  "florence-1504":
    "Votre sensibilité à l'art, à l'architecture et à la beauté classique vous mène tout droit à la Renaissance. Florence 1504 vous ouvrira les ateliers des maîtres et la splendeur de la cité des Médicis.",
};

// Determines the winning destination from the collected answers.
function computeResult(answers) {
  const scores = {};
  for (const value of answers) {
    scores[value] = (scores[value] || 0) + 1;
  }
  // Pick the highest scoring destination; ties follow the data order.
  let winner = destinations[0].id;
  let bestScore = -1;
  for (const destination of destinations) {
    const score = scores[destination.id] || 0;
    if (score > bestScore) {
      bestScore = score;
      winner = destination.id;
    }
  }
  return winner;
}

// Animation variants for sliding questions in and out.
const slide = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function TravelQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const isResult = finished && answers.length === total;

  // Progress includes the result screen as the final state.
  const progress = isResult ? 100 : (step / total) * 100;

  const result = useMemo(
    () => (isResult ? computeResult(answers) : null),
    [isResult, answers],
  );
  const recommended = useMemo(
    () => destinations.find((d) => d.id === result),
    [result],
  );

  // Records an answer and advances to the next question (or the result).
  const handleAnswer = (value) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-noir-soft p-6 sm:p-10">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative z-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-gold/80">
              <span className="flex items-center gap-1.5">
                <Wand2 size={14} /> Quiz personnalisé
              </span>
              <span>
                {isResult ? "Terminé" : `Question ${step + 1} / ${total}`}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Questions */}
            {!isResult && (
              <motion.div
                key={questions[step].id}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
                  {questions[step].question}
                </h3>

                <div className="mt-8 flex flex-col gap-3">
                  {questions[step].options.map((option, index) => (
                    <motion.button
                      key={option.label}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-noir px-5 py-4 text-left text-offwhite transition-colors hover:border-gold/60 hover:bg-gold/5"
                    >
                      <span className="text-base">{option.label}</span>
                      <ArrowRight
                        size={18}
                        className="text-gold opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result */}
            {isResult && recommended && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span className="mx-auto flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
                  <Sparkles size={14} /> Votre destination idéale
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mt-6 overflow-hidden rounded-2xl border border-gold/20"
                >
                  <img
                    src={recommended.image}
                    alt={recommended.name}
                    className="h-48 w-full object-cover sm:h-56"
                  />
                </motion.div>

                <h3 className="mt-6 font-display text-3xl font-semibold text-gold sm:text-4xl">
                  {recommended.name}
                </h3>
                <p className="mt-1 text-sm uppercase tracking-widest text-offwhite/50">
                  {recommended.era} · {recommended.duration}
                </p>

                <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-offwhite/70">
                  {explanations[recommended.id]}
                </p>

                <p className="mt-5 font-display text-xl text-gold">
                  À partir de {formatPrice(recommended.price)}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to={`/reservation/${recommended.id}`}
                    className="btn-glow-gold inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-noir"
                  >
                    Réserver cette destination
                    <ArrowRight size={18} />
                  </Link>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-base font-medium text-gold transition-colors hover:bg-gold/10"
                  >
                    <RefreshCw size={16} />
                    Recommencer le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
