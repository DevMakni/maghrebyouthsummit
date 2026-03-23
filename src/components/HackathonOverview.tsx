import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Users, Clock, Trophy, Target, ArrowRight, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const statIcons = [Users, Clock, Target, Trophy];

const HackathonOverview = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang].hackathon;
  const stats = t.stats.map((s, i) => ({ ...s, icon: statIcons[i] }));

  return (
    <section id="hackathon" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(355_75%_50%/0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 ring-1 ring-primary/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-primary mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            {t.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl md:text-6xl tracking-tighter mb-6"
          >
            <span className="text-white text-glow-white">{t.headingWhite}</span>
            <span className="text-primary text-glow">{t.headingRed}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto"
          >
            {t.description}
            <span className="text-primary font-semibold">{t.descriptionHighlight}</span>.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="card-glass rounded-xl p-5 text-center ring-1 ring-white/10">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-display font-black text-2xl md:text-3xl text-white">{s.value}</div>
              <div className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass rounded-2xl p-8 ring-1 ring-white/10"
          >
            <h3 className="font-display font-bold text-xl text-white mb-5">{t.howItWorks}</h3>
            <div className="space-y-4">
              {t.steps.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 text-primary text-xs font-bold shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="card-glass rounded-2xl p-8 ring-1 ring-primary/20 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
            <h3 className="font-display font-bold text-xl text-white mb-5">{t.whyJoin}</h3>
            <ul className="space-y-4 mb-6">
              {t.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                  <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 rounded-lg px-4 py-3">
              <Target className="w-4 h-4 text-primary shrink-0" />
              <span>{t.domains}</span>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            {t.registerNow}
          </a>
          <button
            onClick={() => navigate("/paths/hackathon")}
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            {t.moreDetails}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonOverview;
