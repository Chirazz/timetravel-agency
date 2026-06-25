import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock3 } from "lucide-react";
import { formatPrice } from "../data/destinations.js";
import { fadeUp } from "../hooks/useScrollReveal.js";

export default function DestinationCard({ destination }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-noir-soft shadow-xl shadow-black/40 transition-colors hover:border-gold/50"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-noir/70 px-3 py-1 text-xs font-medium tracking-wide text-gold backdrop-blur">
          {destination.era}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-noir/70 px-3 py-1 text-xs font-medium text-offwhite backdrop-blur">
          <Star size={13} className="fill-gold text-gold" />
          {destination.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-offwhite">
            {destination.name}
          </h3>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-offwhite/50">
          <Clock3 size={13} className="text-gold" />
          {destination.duration}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-offwhite/65">
          {destination.shortDescription}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-offwhite/40">
              À partir de
            </p>
            <p className="font-display text-2xl font-semibold text-gold">
              {formatPrice(destination.price)}
            </p>
          </div>
          <Link
            to={`/destinations/${destination.id}`}
            className="group/btn inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-noir"
          >
            Voir plus
            <ArrowRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
