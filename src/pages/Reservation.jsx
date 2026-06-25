import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Users,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { destinations, formatPrice } from "../data/destinations.js";

const emptyForm = {
  name: "",
  email: "",
  destination: "",
  travelers: 1,
  date: "",
  message: "",
};

export default function Reservation() {
  const { id } = useParams();
  const [form, setForm] = useState({ ...emptyForm, destination: id ?? "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selected = useMemo(
    () => destinations.find((d) => d.id === form.destination),
    [form.destination],
  );

  const total = selected ? selected.price * Number(form.travelers || 1) : 0;

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Adresse e-mail invalide.";
    if (!form.destination) next.destination = "Choisissez une destination.";
    if (!form.date) next.date = "Sélectionnez une date de départ.";
    if (Number(form.travelers) < 1)
      next.travelers = "Au moins un voyageur est requis.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
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
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckCircle2 size={34} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-offwhite">
                    Réservation confirmée&nbsp;!
                  </h3>
                  <p className="mt-3 text-offwhite/65">
                    Merci {form.name.split(" ")[0]}, votre demande pour{" "}
                    <span className="text-gold">
                      {selected ? selected.name : "votre voyage"}
                    </span>{" "}
                    a bien été enregistrée. Un chrono-conseiller vous contactera
                    sous 24h (à notre époque).
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
                    <Field label="Nom complet" error={errors.name} icon={User}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Ada Lovelace"
                        className={inputClass}
                      />
                    </Field>

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
                        label="Voyageurs"
                        error={errors.travelers}
                        icon={Users}
                      >
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={form.travelers}
                          onChange={(e) =>
                            update("travelers", e.target.value)
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field
                        label="Date de départ"
                        error={errors.date}
                        icon={CalendarDays}
                      >
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </Field>
                    </div>

                    <Field label="Message (optionnel)">
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
                      className="w-full rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-noir transition-all hover:shadow-lg hover:shadow-gold/30"
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
                              <span>Prix unitaire</span>
                              <span>{formatPrice(selected.price)}</span>
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
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
