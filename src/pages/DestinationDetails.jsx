import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock3,
  Mountain,
  Check,
  CalendarCheck,
} from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import {
  getDestinationById,
  formatPrice,
  destinations,
} from "../data/destinations.js";
import { fadeUp, staggerContainer } from "../hooks/useScrollReveal.js";

export default function DestinationDetails() {
  const { id } = useParams();
  const destination = getDestinationById(id);

  if (!destination) {
    return (
      <PageTransition>
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 pt-32 text-center">
          <h1 className="font-display text-3xl font-semibold text-offwhite">
            Destination introuvable
          </h1>
          <p className="mt-3 text-offwhite/60">
            Cette époque n'existe pas (encore) dans notre catalogue temporel.
          </p>
          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-noir"
          >
            <ArrowLeft size={16} />
            Retour aux destinations
          </Link>
        </div>
      </PageTransition>
    );
  }

  const facts = [
    { icon: Clock3, label: "Durée", value: destination.duration },
    { icon: Mountain, label: "Intensité", value: destination.difficulty },
    {
      icon: Star,
      label: "Note",
      value: `${destination.rating.toFixed(1)} / 5`,
    },
    { icon: CalendarCheck, label: "Époque", value: destination.era },
  ];

  const related = destinations.filter((d) => d.id !== destination.id);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 text-sm text-offwhite/70 transition-colors hover:text-gold"
              >
                <ArrowLeft size={16} />
                Toutes les destinations
              </Link>
              <span className="mt-4 block rounded-full border border-gold/40 bg-noir/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-gold backdrop-blur w-fit">
                {destination.era} · {destination.year}
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold text-offwhite text-glow-gold sm:text-5xl md:text-6xl">
                {destination.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-offwhite/75">
                {destination.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Facts */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {facts.map((fact) => (
                <motion.div
                  key={fact.label}
                  variants={fadeUp}
                  className="rounded-xl border border-white/10 bg-noir-soft p-4"
                >
                  <fact.icon size={18} className="text-gold" />
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-offwhite/40">
                    {fact.label}
                  </p>
                  <p className="text-sm font-medium text-offwhite">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12"
            >
              <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
                L'expérience
              </h2>
              <p className="mt-4 text-base leading-relaxed text-offwhite/70">
                {destination.description}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10"
            >
              <h3 className="font-display text-xl font-semibold text-offwhite">
                Temps forts
              </h3>
              <ul className="mt-4 space-y-3">
                {destination.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-3 text-offwhite/75"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Check size={14} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Gallery */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12"
            >
              <h3 className="font-display text-xl font-semibold text-offwhite">
                Galerie
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {destination.gallery.map((src, index) => (
                  <motion.div
                    key={src}
                    variants={fadeUp}
                    className={`overflow-hidden rounded-xl border border-white/10 ${
                      index === 0 ? "col-span-2 sm:col-span-1" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${destination.name} - vue ${index + 1}`}
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-28 rounded-2xl border border-gold/25 bg-noir-soft p-6 shadow-xl shadow-black/40"
            >
              <p className="text-xs uppercase tracking-widest text-offwhite/40">
                À partir de
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-gold">
                {formatPrice(destination.price)}
              </p>
              <p className="mt-1 text-sm text-offwhite/50">
                par voyageur · tout inclus
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-offwhite/70">
                <p className="flex items-center gap-2">
                  <Check size={15} className="text-gold" />
                  Transfert temporel sécurisé
                </p>
                <p className="flex items-center gap-2">
                  <Check size={15} className="text-gold" />
                  Chrono-guide privé
                </p>
                <p className="flex items-center gap-2">
                  <Check size={15} className="text-gold" />
                  Équipement d'époque fourni
                </p>
                <p className="flex items-center gap-2">
                  <Check size={15} className="text-gold" />
                  Assurance retour garanti
                </p>
              </div>

              <Link
                to={`/reservation/${destination.id}`}
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-noir transition-all hover:shadow-lg hover:shadow-gold/30"
              >
                Réserver ce voyage
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold text-offwhite">
            Autres époques à explorer
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((d) => (
              <Link
                key={d.id}
                to={`/destinations/${d.id}`}
                className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-noir-soft p-3 transition-colors hover:border-gold/40"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-20 w-24 shrink-0 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold">
                    {d.era}
                  </p>
                  <p className="font-display text-lg font-semibold text-offwhite">
                    {d.name}
                  </p>
                  <p className="text-sm text-offwhite/55">
                    {formatPrice(d.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
