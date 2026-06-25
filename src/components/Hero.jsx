import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  heroTitleContainer,
  heroTitleWord,
} from "../hooks/useScrollReveal.js";

const titleLines = [
  { words: ["Explore", "Time"], className: "text-offwhite" },
  { words: ["Beyond", "Limits"], className: "text-gold" },
];

export default function Hero() {
  const scrollToNext = () => {
    const target = document.getElementById("decouvrir");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2000&q=80"
          alt="Voyage à travers le temps et les étoiles"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/60 to-noir" />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-gold/40 bg-noir/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-gold backdrop-blur"
        >
          Agence de voyage temporel
        </motion.span>

        <motion.h1
          variants={heroTitleContainer}
          initial="hidden"
          animate="visible"
          style={{ perspective: 800 }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-glow-gold sm:text-6xl md:text-7xl"
        >
          {titleLines.map((line) => (
            <span key={line.words.join("-")} className={`block ${line.className}`}>
              {line.words.map((word) => (
                <motion.span
                  key={word}
                  variants={heroTitleWord}
                  className="mr-[0.25em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/75 sm:text-xl"
        >
          Voyagez à travers les époques avec TimeTravel Agency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/destinations"
            className="btn-glow-gold group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-noir"
          >
            Découvrir les destinations
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-offwhite/25 px-7 py-3.5 text-base font-medium text-offwhite transition-all duration-700 hover:border-gold hover:text-gold"
          >
            En savoir plus
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        aria-label="Faire défiler vers la suite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-gold/70 transition-colors hover:text-gold"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
