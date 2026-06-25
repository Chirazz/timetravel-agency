import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Atom, Globe2, Award, Heart } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { fadeUp, staggerContainer } from "../hooks/useScrollReveal.js";

const values = [
  {
    icon: Atom,
    title: "Innovation temporelle",
    text: "Notre technologie chrono-quantique repousse les frontières du possible depuis 2147.",
  },
  {
    icon: Globe2,
    title: "Respect de l'Histoire",
    text: "Chaque voyage respecte une charte stricte de non-interférence avec le passé.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "Un service primé, pensé pour offrir une expérience inoubliable à chaque époque.",
  },
  {
    icon: Heart,
    title: "Passion",
    text: "Une équipe d'historiens et d'explorateurs animés par l'amour du temps.",
  },
];

const timeline = [
  {
    year: "2147",
    title: "La première brèche",
    text: "Découverte du premier corridor temporel stable par le Dr. Élise Vance.",
  },
  {
    year: "2151",
    title: "Naissance de l'agence",
    text: "Fondation de TimeTravel Agency, première compagnie de voyage temporel privée.",
  },
  {
    year: "2156",
    title: "Premières expéditions",
    text: "Ouverture des routes vers la Renaissance et la Belle Époque.",
  },
  {
    year: "2160",
    title: "L'ère du Crétacé",
    text: "Lancement de l'expédition extrême au cœur de l'âge des dinosaures.",
  },
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80"
            alt="Cosmos et voyage temporel"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/60 to-noir" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Notre histoire
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-offwhite text-glow-gold sm:text-5xl md:text-6xl">
            Pionniers du voyage à travers le temps
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-offwhite/70">
            TimeTravel Agency est née d'un rêve : offrir à l'humanité la
            possibilité de vivre l'Histoire, et non plus seulement de la lire.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80"
              alt="Technologie temporelle"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Notre mission
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
              Rendre le temps accessible, en toute sécurité
            </h2>
            <p className="mt-5 text-base leading-relaxed text-offwhite/65">
              Nous concevons des expéditions temporelles d'exception qui
              allient luxe, sécurité et émerveillement. Chaque détail est pensé
              pour que vous viviez l'Histoire de l'intérieur, accompagné par nos
              chrono-guides experts.
            </p>
            <p className="mt-4 text-base leading-relaxed text-offwhite/65">
              De la Renaissance florentine aux plaines du Crétacé, nos
              voyageurs reviennent transformés, riches de souvenirs qu'aucune
              autre agence ne peut offrir.
            </p>
            <Link
              to="/destinations"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-noir"
            >
              Découvrir nos époques
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/5 bg-noir-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui nous anime"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-noir p-6 transition-colors hover:border-gold/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 text-gold">
                  <value.icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-offwhite">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <SectionHeading eyebrow="Notre parcours" title="Une histoire dans le temps" />
        <div className="mt-14 space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative flex gap-6 border-l border-gold/30 pl-8"
            >
              <span className="absolute -left-2.5 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-noir">
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <div>
                <span className="font-display text-2xl font-semibold text-gold">
                  {item.year}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-offwhite">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-offwhite/60">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl border border-gold/20 bg-gradient-to-br from-noir-soft to-noir px-6 py-14 text-center sm:px-12"
        >
          <h2 className="font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Votre aventure commence maintenant
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-offwhite/60">
            Rejoignez les milliers de voyageurs qui ont déjà franchi les limites
            du temps avec nous.
          </p>
          <Link
            to="/reservation"
            className="btn-glow-gold group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-noir"
          >
            Réserver mon voyage
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
