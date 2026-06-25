import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Users,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  Crown,
} from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { destinations, formatPrice } from "../data/destinations.js";

const STORAGE_KEY = "timetravel-reservation-draft";

// Experience tiers with a price multiplier applied to the base destination price.
const experiences = [
  {
    id: "standard",
    label: "Standard",
    description: "L'expédition essentielle",
    multiplier: 1,
  },
  {
    id: "premium",
    label: "Premium",
    description: "Confort et services étendus",
    multiplier: 1.5,
  },
  {
    id: "luxe",
    label: "Luxe",
    description: "L'excellence absolue, sur-mesure",
    multiplier: 2.2,
  },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  destination: "",
  date: "",
  travelers: 1,
  experience: "standard",
  message: "",
};

// Today's date as YYYY-MM-DD, used as the minimum selectable departure date.
const today = new Date().toISOString().split("T")[0];

export default function Reservation() {
  const { id } = useParams();

  // Restore any draft saved in LocalStorage, then apply the URL destination.
  const [form, setForm] = useState(() => {
    let draft = {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) draft = JSON.parse(stored);
    } catch {
      draft = {};
    }
    return {
      ...emptyForm,
      ...draft,
      destination: id ?? draft.destination ?? "",
    };
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Persist the draft on every change so progress is never lost.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors (e.g. private mode quota).
    }
  }, [form]);

  const selected = useMemo(
    () => destinations.find((d) => d.id === form.destination),
    [form.destination],
  );

  const tier = useMemo(
    () =>
      experiences.find((e) => e.id === form.experience) ?? experiences[0],
    [form.experience],
  );

  const unitPrice = selected ? selected.price * tier.multiplier : 0;
  const total = unitPrice * Number(form.travelers || 1);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Veuillez indiquer votre prénom.";
    if (!form.lastName.trim()) next.lastName = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Adresse e-mail invalide.";
    if (!/^[+\d][\d\s().-]{7,}$/.test(form.phone.trim()))
      next.phone = "Numéro de téléphone invalide.";
    if (!form.destination) next.destination = "Choisissez une destination.";
    if (!form.date) {
      next.date = "Sélectionnez une date de départ.";
    } else if (form.date < today) {
      next.date = "La date ne peut pas être dans le passé.";
    }
    const travelers = Number(form.travelers);
    if (!Number.isInteger(travelers) || travelers < 1 || travelers > 8)
      next.travelers = "Le nombre de voyageurs doit être compris entre 1 et 8.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Clear the draft once the reservation is confirmed.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors.
      }
    }
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setErrors({});
    setSubmitted(false);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-noir px-4 py-3 text-offwhite placeholder:text-offwhite/35 outline-none transition-colors focus:border-gold";

  return (
    <PageTransition>
      <section className="relative pb-24 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir" />

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Réservation"
            title="Réservez votre voyage temporel"
            subtitle="Complétez le formulaire ci-dessous, nos chrono-conseillers vous recontacteront pour finaliser votre expédition."
          />

          <div className="mt-14">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto max-w-xl rounded-3xl border border-gold/30 bg-noir-soft p-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold"
                  >
                    <CheckCircle2 size={34} />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-offwhite">
                    Réservation confirmée&nbsp;!
                  </h3>
                  <p className="mt-3 text-offwhite/65">
                    Merci {form.firstName}, votre demande pour{" "}
                    <span className="text-gold">
                      {selected ? selected.name : "votre voyage"}
                    </span>{" "}
                    en formule{" "}
                    <span className="text-gold">{tier.label}</span> a bien été
                    enregistrée. Un chrono-conseiller vous contactera sous 24h (à
                    notre époque).
                  </p>
                  {selected && (
                    <p className="mt-4 font-display text-xl text-gold">
                      Total estimé : {formatPrice(total)}
                    </p>
                  )}
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-noir"
                    >
                      Nouvelle réservation
                    </button>
                    <Link
                      to="/destinations"
                      className="rounded-full border border-gold/40 px-6 py-3 text-sm font-medium text-gold"
                    >
                      Voir les destinations
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-8 lg:grid-cols-5"
                >
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="lg:col-span-3 space-y-5 rounded-3xl border border-white/10 bg-noir-soft p-6 sm:p-8"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Prénom" error={errors.firstName} icon={User}>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          placeholder="Ada"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Nom" error={errors.lastName} icon={User}>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                          placeholder="Lovelace"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="E-mail" error={errors.email} icon={Mail}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="vous@exemple.com"
                          className={inputClass}
                        />
                      </Field>

                      <Field
                        label="Téléphone"
                        error={errors.phone}
                        icon={Phone}
                      >
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Destination"
                      error={errors.destination}
                      icon={Sparkles}
                    >
                      <select
                        value={form.destination}
                        onChange={(e) => update("destination", e.target.value)}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">Sélectionnez une époque…</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {formatPrice(d.price)}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Date de départ"
                        error={errors.date}
                        icon={CalendarDays}
                      >
                        <input
                          type="date"
                          min={today}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </Field>

                      <Field
                        label="Nombre de voyageurs"
                        error={errors.travelers}
                        icon={Users}
                      >
                        <input
                          type="number"
                          min={1}
                          max={8}
                          value={form.travelers}
                          onChange={(e) => update("travelers", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {/* Experience tier selector */}
                    <Field
                      label="Type d'expérience"
                      error={errors.experience}
                      icon={Crown}
                    >
                      <div className="grid gap-3 sm:grid-cols-3">
                        {experiences.map((exp) => {
                          const active = form.experience === exp.id;
                          return (
                            <button
                              key={exp.id}
                              type="button"
                              onClick={() => update("experience", exp.id)}
                              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                                active
                                  ? "border-gold bg-gold/10"
                                  : "border-white/10 bg-noir hover:border-gold/50"
                              }`}
                            >
                              <span
                                className={`block text-sm font-semibold ${
                                  active ? "text-gold" : "text-offwhite"
                                }`}
                              >
                                {exp.label}
                              </span>
                              <span className="mt-1 block text-xs text-offwhite/55">
                                {exp.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field label="Message spécial (optionnel)">
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Vos attentes, demandes particulières…"
                        className={`${inputClass} resize-none`}
                      />
                    </Field>

                    <button
                      type="submit"
                      className="btn-glow-gold w-full rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-noir"
                    >
                      Confirmer la réservation
                    </button>
                  </form>

                  {/* Summary */}
                  <div className="lg:col-span-2">
                    <div className="sticky top-28 rounded-3xl border border-gold/25 bg-noir-soft p-6">
                      <h3 className="font-display text-xl font-semibold text-offwhite">
                        Récapitulatif
                      </h3>

                      {selected ? (
                        <>
                          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                            <img
                              src={selected.image}
                              alt={selected.name}
                              className="h-36 w-full object-cover"
                            />
                          </div>
                          <p className="mt-4 font-display text-lg font-semibold text-offwhite">
                            {selected.name}
                          </p>
                          <p className="text-sm text-offwhite/55">
                            {selected.era} · {selected.duration}
                          </p>

                          <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
                            <div className="flex justify-between text-offwhite/65">
                              <span>Formule</span>
                              <span className="text-gold">{tier.label}</span>
                            </div>
                            <div className="flex justify-between text-offwhite/65">
                              <span>Prix unitaire</span>
                              <span>{formatPrice(unitPrice)}</span>
                            </div>
                            <div className="flex justify-between text-offwhite/65">
                              <span>Voyageurs</span>
                              <span>{form.travelers || 1}</span>
                            </div>
                            <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-semibold text-gold">
                              <span>Total</span>
                              <span>{formatPrice(total)}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="mt-5 text-sm text-offwhite/55">
                          Sélectionnez une destination pour afficher le détail
                          de votre voyage et le tarif estimé.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, error, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-offwhite/80">
        {Icon && <Icon size={15} className="text-gold" />}
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 block text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
