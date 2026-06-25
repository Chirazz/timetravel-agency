import { Link } from "react-router-dom";
import { Clock, Camera, Bird, MessageCircle, PlayCircle, Mail } from "lucide-react";

const navColumns = [
  {
    title: "Navigation",
    links: [
      { to: "/", label: "Accueil" },
      { to: "/destinations", label: "Destinations" },
      { to: "/reservation", label: "Réservation" },
      { to: "/about", label: "À propos" },
    ],
  },
  {
    title: "Époques",
    links: [
      { to: "/destinations/paris-1889", label: "Paris 1889" },
      { to: "/destinations/cretace-65m", label: "Crétacé -65M" },
      { to: "/destinations/florence-1504", label: "Florence 1504" },
    ],
  },
];

const socials = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: Bird, label: "Twitter", href: "https://twitter.com" },
  { icon: MessageCircle, label: "Facebook", href: "https://facebook.com" },
  { icon: PlayCircle, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-noir-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Clock size={18} strokeWidth={1.5} />
              </span>
              <span className="font-display text-xl font-semibold text-offwhite">
                TimeTravel<span className="text-gold"> Agency</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/55">
              Voyagez à travers les époques. Des expéditions temporelles
              d'exception, conçues pour les explorateurs du temps les plus
              exigeants.
            </p>
          </div>

          {navColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Suivez-nous
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-offwhite/70 transition-all hover:border-gold hover:bg-gold hover:text-noir"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <a
              href="mailto:contact@timetravel.agency"
              className="mt-5 inline-flex items-center gap-2 text-sm text-offwhite/60 transition-colors hover:text-gold"
            >
              <Mail size={16} />
              contact@timetravel.agency
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center text-xs text-offwhite/40 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} TimeTravel Agency. Tous droits
            réservés.
          </p>
          <p>Voyage temporel fictif — à des fins de démonstration uniquement.</p>
        </div>
      </div>
    </footer>
  );
}
