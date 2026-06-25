import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="font-display text-8xl font-semibold text-gold text-glow-gold">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-offwhite">
            Anomalie temporelle détectée
          </h1>
          <p className="mx-auto mt-3 max-w-md text-offwhite/60">
            Cette page semble s'être perdue dans un pli du continuum
            espace-temps. Revenons à une époque connue.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-noir"
            >
              <Home size={16} />
              Retour à l'accueil
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-medium text-gold"
            >
              <Compass size={16} />
              Voir les destinations
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
