import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = Math.max(target.getTime() - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const EVENT_DATE = new Date("2026-04-10T00:00:00");
const PAYMENT_CLOSE = new Date("2026-04-05T23:59:59");

interface CountdownRowProps {
  label: string;
  subtitle: string;
  target: Date;
  accent?: boolean;
  unitLabels: { days: string; hours: string; minutes: string; seconds: string };
}

const CountdownRow = ({ label, subtitle, target, accent, unitLabels }: CountdownRowProps) => {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: unitLabels.days },
    { key: "hours", label: unitLabels.hours },
    { key: "minutes", label: unitLabels.minutes },
    { key: "seconds", label: unitLabels.seconds },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="text-center space-y-1">
        <h3 className="font-display font-bold text-lg md:text-xl tracking-wide uppercase text-white">
          {label}
        </h3>
        <p className="text-sm text-white/60">{subtitle}</p>
      </div>

      {/* Timer bar */}
      <div
        className={`rounded-2xl px-4 py-5 md:px-8 md:py-6 grid grid-cols-4 gap-2 md:gap-6 ${
          accent
            ? "bg-primary/20 ring-1 ring-primary/40 shadow-lg shadow-primary/10"
            : "card-glass"
        }`}
      >
        {units.map(({ key, label: unitLabel }) => (
          <div key={key} className="flex flex-col items-center">
            <span
              className={`font-display font-black text-3xl md:text-5xl tabular-nums leading-none ${
                accent ? "text-primary text-glow" : "text-white"
              }`}
            >
              {pad(time[key])}
            </span>
            <span className="mt-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50">
              {unitLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CountdownSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].countdown;
  const unitLabels = { days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds };
  return (
  <section className="relative py-20 md:py-28">
    <div className="absolute inset-0 section-overlay" />
    <div className="container mx-auto px-6 max-w-3xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center text-glow-white">
          {t.dontMissOut}
        </h2>

        {/* Payment deadline â€” accent style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <CountdownRow
            label={t.paymentClosing}
            subtitle={t.paymentDate}
            target={PAYMENT_CLOSE}
            accent
            unitLabels={unitLabels}
          />
        </motion.div>

        {/* Event date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CountdownRow
            label={t.eventStarts}
            subtitle={t.eventDate}
            target={EVENT_DATE}
            unitLabels={unitLabels}
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default CountdownSection;
