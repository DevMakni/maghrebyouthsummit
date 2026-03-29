import { motion } from "framer-motion";
import { UserSearch, Eye, Sparkles, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const ICONS = [UserSearch, Eye, Sparkles, HeartHandshake];

const WhyPartnerSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whyPartner;
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
        >
          {t.heading}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {t.reasons.map((r, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card-glass rounded-2xl p-8 transition-all duration-300 text-center group"
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
  );
};

export default WhyPartnerSection;