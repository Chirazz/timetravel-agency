import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-offwhite text-glow-gold sm:text-6xl md:text-7xl"
        >
          Explore Time
          <span className="block text-gold">Beyond Limits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/75 sm:text-xl"
        >
          Voyagez à travers les époques avec TimeTravel Agency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-noir shadow-lg shadow-gold/20 transition-all hover:shadow-gold/40"
          >
            Découvrir les destinations
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-offwhite/25 px-7 py-3.5 text-base font-medium text-offwhite transition-all hover:border-gold hover:text-gold"
          >
            En savoir plus
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/70"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
