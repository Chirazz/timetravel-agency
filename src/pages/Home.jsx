import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Compass, Hourglass } from "lucide-react";
import Hero from "../components/Hero.jsx";
import PageTransition from "../components/PageTransition.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import { destinations } from "../data/destinations.js";
import { fadeUp, staggerContainer } from "../hooks/useScrollReveal.js";

const features = [
  {
    icon: ShieldCheck,
    title: "Sécurité temporelle",
    text: "Des protocoles de voyage certifiés et un encadrement par nos chrono-guides experts.",
  },
  {
    icon: Sparkles,
    title: "Expériences de luxe",
    text: "Confort absolu et accès privilégié à des moments uniques de l'Histoire.",
  },
  {
    icon: Compass,
    title: "Destinations exclusives",
    text: "Des époques soigneusement sélectionnées, du Crétacé à la Renaissance.",
  },
  {
    icon: Hourglass,
    title: "Voyages sur mesure",
    text: "Chaque expédition est conçue autour de vos envies d'exploration.",
  },
];

const stats = [
  { value: "12K+", label: "Voyageurs temporels" },
  { value: "3", label: "Époques disponibles" },
  { value: "100%", label: "Retours garantis" },
  { value: "4.9/5", label: "Satisfaction" },
];

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      {/* Stats */}
      <section className="border-y border-white/5 bg-noir-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-display text-4xl font-semibold text-gold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-offwhite/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="Nos destinations"
          title="Choisissez votre époque"
          subtitle="Trois expéditions temporelles d'exception, chacune offrant une immersion totale dans un moment clé de l'Histoire."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold"
          >
            Voir toutes les destinations
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5 bg-noir-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <SectionHeading
            eyebrow="Pourquoi nous"
            title="L'art du voyage temporel"
            subtitle="Une expérience pensée dans les moindres détails, du départ jusqu'à votre retour à notre époque."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-noir p-6 transition-colors hover:border-gold/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 text-gold">
                  <feature.icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-offwhite">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-noir-soft to-noir px-6 py-16 text-center sm:px-12"
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-semibold text-offwhite sm:text-4xl md:text-5xl">
              Prêt à franchir les limites du temps&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-offwhite/60">
              Réservez dès maintenant votre prochaine expédition temporelle et
              écrivez votre propre page d'Histoire.
            </p>
            <Link
              to="/reservation"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-noir transition-all hover:shadow-lg hover:shadow-gold/30"
            >
              Réserver mon voyage
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
