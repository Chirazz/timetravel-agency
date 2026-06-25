import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/destinations", label: "Destinations" },
  { to: "/reservation", label: "Réservation" },
  { to: "/about", label: "À propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-noir/85 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="TimeTravel Agency - Accueil"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-noir">
            <Clock size={18} strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-offwhite">
            TimeTravel<span className="text-gold"> Agency</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-offwhite/70 hover:text-offwhite"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/destinations"
            className="btn-glow-gold rounded-full border border-gold bg-gold px-5 py-2 text-sm font-semibold text-noir hover:bg-transparent hover:text-gold"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-offwhite md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold/10 bg-noir/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gold/10 text-gold"
                        : "text-offwhite/80 hover:bg-white/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/destinations"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-base font-semibold text-noir"
              >
                Réserver un voyage
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
