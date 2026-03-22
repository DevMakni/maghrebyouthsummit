import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import InvitationCard from "@/components/InvitationCard";

const trackOptions = [
  "Entrepreneurship Program",
  "Entrepreneurship Hackathon",
  "Innovation, Digital & AI 2030",
  "High School Program",
];

const sourceOptions = [
  "Social Media",
  "Friend / Word of Mouth",
  "University / School",
  "Email",
  "Other",
];

const inputClass =
  "w-full bg-white/5 border-none ring-1 ring-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary outline-none transition-all text-sm";

/* ── Custom Select ── */
interface CustomSelectProps {
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

const CustomSelect = ({ name, placeholder, options, value, onChange }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center justify-between text-left ${
          value ? "text-white" : "text-white/40"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-2 text-white/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full rounded-lg bg-[#1a1a2e]/95 backdrop-blur-xl ring-1 ring-white/10 shadow-xl shadow-black/40 overflow-hidden py-1"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                    value === opt
                      ? "bg-primary/20 text-primary"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzcEB_4pMH_Enjf3SAX0cSPFlMG_0lsucyOEBH6jX4n8a6APdo4i9Bt6VWgaBcGkgv5PQ/exec";

const RegistrationSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [track, setTrack] = useState("");
  const [source, setSource] = useState("");
  const [showInvitation, setShowInvitation] = useState(false);
  const [invitationName, setInvitationName] = useState("");
  const [invitationTrack, setInvitationTrack] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        fullName: formData.fullName,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        track,
        source,
      });

      await fetch(`${SHEET_API_URL}?${params.toString()}`, {
        method: "GET",
        mode: "no-cors",
      });
      setSubmitted(true);
      setInvitationName(formData.fullName);
      setInvitationTrack(track || "Young Leader");
      setShowInvitation(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section id="register" className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
        >
          Register Now
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-glass rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Registration Received
                </h3>
                <p className="text-white/60">
                  Your registration has been received. We will contact you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="card-glass rounded-2xl p-8 md:p-12 space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input name="fullName" required placeholder="Full Name" className={inputClass} value={formData.fullName} onChange={handleChange} />
                  <input name="age" required type="number" min={14} max={40} placeholder="Age" className={inputClass} value={formData.age} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input name="email" required type="email" placeholder="Email" className={inputClass} value={formData.email} onChange={handleChange} />
                  <input name="phone" required type="tel" placeholder="Phone Number" className={inputClass} value={formData.phone} onChange={handleChange} />
                </div>
                <input name="city" required placeholder="City / Country" className={inputClass} value={formData.city} onChange={handleChange} />
                <CustomSelect
                  name="track"
                  placeholder="Select Program Track"
                  options={trackOptions}
                  value={track}
                  onChange={setTrack}
                />
                <CustomSelect
                  name="source"
                  placeholder="How did you hear about us?"
                  options={sourceOptions}
                  value={source}
                  onChange={setSource}
                />

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-4 rounded-full text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Confirm Registration"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>

    <AnimatePresence>
      {showInvitation && (
        <InvitationCard
          name={invitationName}
          track={invitationTrack}
          onClose={() => setShowInvitation(false)}
        />
      )}
    </AnimatePresence>
    </>
  );
};

export default RegistrationSection;
