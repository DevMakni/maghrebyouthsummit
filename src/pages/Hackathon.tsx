import { motion } from "framer-motion";
import { Trophy, Clock, Users, Zap, Brain, Lightbulb, Leaf, Target, BookOpen, CalendarDays, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const STAT_ICONS = [Users, Target, Clock, Trophy];

const HIGHLIGHT_COLORS = [
  { color: "text-blue-400",    bg: "bg-blue-500/15",    bgHover: "group-hover:bg-blue-500/25" },
  { color: "text-primary",     bg: "bg-primary/15",     bgHover: "group-hover:bg-primary/25" },
  { color: "text-emerald-400", bg: "bg-emerald-500/15", bgHover: "group-hover:bg-emerald-500/25" },
  { color: "text-amber-400",   bg: "bg-amber-500/15",   bgHover: "group-hover:bg-amber-500/25" },
];
const HIGHLIGHT_ICONS = [Brain, Lightbulb, Leaf, Zap];

const STAT_VALUES = ["20-30", "3-5", "24H", "1"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  }),
};

const Hackathon = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hackathonPage;
  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center pt-28 pb-20">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.15)_0%,transparent_65%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 ring-1 ring-primary/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-primary mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            {t.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6"
          >
            <span className="text-white text-glow-white">ONE OF </span>
            <span className="text-primary text-glow">HUNDRED</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 font-medium mb-3"
          >
            {t.heroSub}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-white/65 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            {t.heroDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
          >
            {STAT_VALUES.map((val, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div key={i} className="card-glass rounded-xl p-5 text-center ring-1 ring-white/10">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
                  <div className="font-display font-black text-2xl md:text-3xl text-white">{val}</div>
                  <div className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wider">{t.statsLabels[i]}</div>
                </div>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95">
              {t.applyNow}
            </a>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CalendarDays className="w-4 h-4 text-primary" />
              10, 11 &amp; 12 Avril 2026
              <span className="mx-2 text-white/20">|</span>
              <MapPin className="w-4 h-4 text-primary" />
              Monastir, Tunisia
            </div>
          </motion.div>
        </div>
      </section>

      {/* CHALLENGE DOMAINS */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 section-overlay" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
          >
            {t.challengeHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-white/60 text-center max-w-xl mx-auto mb-14"
          >
            {t.challengeSub}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.highlights.map((h, i) => {
              const c = HIGHLIGHT_COLORS[i];
              const Icon = HIGHLIGHT_ICONS[i];
              return (
                <motion.div
                  key={i}
                  custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-glass rounded-2xl p-8 text-center group ring-1 ring-white/10"
                >
                  <div className={`w-14 h-14 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-4 ${c.bgHover} group-hover:scale-110 transition-all duration-300`}>
                    <Icon className={`w-7 h-7 ${c.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{h.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{h.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RULEBOOK */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.08)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="card-glass rounded-2xl p-10 ring-1 ring-primary/20"
          >
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-bold text-2xl text-white mb-3">{t.rulebookHeading}</h3>
            <p className="text-white/55 mb-6">{t.rulebookBody}</p>
            <a href="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95">
              {t.applyNow}
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-8 border-t border-white/10">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoWhite} alt="Maghreb Youth Summit" className="h-8 opacity-70" />
          <p className="text-xs text-white/40">{t.copyright}</p>
          <a href="/" className="text-xs text-white/50 hover:text-white transition-colors">{t.backHome}</a>
        </div>
      </footer>
    </div>
  );
};

export default Hackathon;