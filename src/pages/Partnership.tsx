import { motion } from "framer-motion";
import { Download, Mail, Phone, UserSearch, Eye, Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const REASON_ICONS = [UserSearch, Eye, Sparkles, HeartHandshake];

const TIER_STYLES = [
  { color: "from-white/20 to-white/5",         ring: "ring-white/30",          badge: "bg-white/10 text-white" },
  { color: "from-yellow-400/20 to-yellow-400/5", ring: "ring-yellow-400/30",   badge: "bg-yellow-400/15 text-yellow-300" },
  { color: "from-slate-300/20 to-slate-300/5",  ring: "ring-slate-300/30",     badge: "bg-slate-300/15 text-slate-300" },
  { color: "from-orange-400/20 to-orange-400/5", ring: "ring-orange-400/30",   badge: "bg-orange-400/15 text-orange-300" },
];

const STAT_VALUES = ["2000+", "5M+", "4", "40+", "30+"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  }),
};

const Partnership = () => {
  const { lang } = useLanguage();
  const t = translations[lang].partnershipPage;
  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center pt-28 pb-20">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.12)_0%,transparent_65%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 ring-1 ring-primary/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-primary mb-8"
          >
            {t.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6 text-glow-white"
          >
            {t.heroHeading1} <br />
            <span className="text-primary text-glow">{t.heroHeading2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {t.heroDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/partner-dossier.pdf" download
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <Download className="w-5 h-5" />
              {t.downloadDossier}
            </a>
            <a href="mailto:sponsorship@maghrebyouthsummit.com"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <Mail className="w-5 h-5" />
              {t.contactUs}
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-14">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-8 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16">
            {STAT_VALUES.map((val, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
                <div className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg">{val}</div>
                <div className="text-sm text-white/55 mt-1 font-medium">{t.statsLabels[i]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 section-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
          >
            {t.whyHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-center max-w-xl mx-auto mb-14"
          >
            {t.whySub}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.reasons.map((r, i) => {
              const Icon = REASON_ICONS[i];
              return (
                <motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-glass rounded-2xl p-8 text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 section-overlay-strong" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
          >
            {t.tiersHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-center max-w-xl mx-auto mb-16"
          >
            {t.tiersSub}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {t.tierNames.map((name, i) => {
              const style = TIER_STYLES[i];
              return (
                <motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`relative card-glass rounded-2xl p-7 ring-1 ${style.ring} overflow-hidden group`}
                >
                  <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${style.color} pointer-events-none`} />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="relative z-10">
                    <span className={`inline-block text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-4 ${style.badge}`}>
                      {name}
                    </span>
                    <ul className="space-y-2.5 mt-2">
                      {t.tierPerks[i].map((perk, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-white/40 text-sm mt-10"
          >
            {t.allPackages}
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 section-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.08)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mb-4"
          >
            {t.readyHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 mb-10 text-lg"
          >
            {t.readyDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a href="/partner-dossier.pdf" download
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <Download className="w-5 h-5" />
              {t.downloadDossierShort}
            </a>
            <a href="mailto:sponsorship@maghrebyouthsummit.com"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <Mail className="w-5 h-5" />
              sponsorship@maghrebyouthsummit.com
            </a>
          </motion.div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/50">
            <a href="tel:+21652053438" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
              +216 52 053 438
            </a>
            <a href="tel:+21658410458" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
              +216 58 410 458
            </a>
          </div>
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

export default Partnership;