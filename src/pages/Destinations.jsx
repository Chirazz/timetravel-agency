import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import { destinations } from "../data/destinations.js";
import { staggerContainer } from "../hooks/useScrollReveal.js";

export default function Destinations() {
  return (
    <PageTransition>
      {/* Page header */}
      <section className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="left"
            eyebrow="Toutes nos destinations"
            title="Explorez les époques"
            subtitle="Sélectionnez la période qui vous fait rêver et préparez-vous à un voyage hors du temps."
          />
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
