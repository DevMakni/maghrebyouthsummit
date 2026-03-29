import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const statValues = ["+2000", "+35", "+40", "4", "5M"];

const StatsBar = () => {
  const { lang } = useLanguage();
  const labels = translations[lang].stats.labels;
  const stats = statValues.map((value, i) => ({ value, label: labels[i] }));
  return (
  <section className="relative py-16">
    <div className="absolute inset-0 section-overlay-strong" />
    <div className="container mx-auto px-8 md:px-6 relative z-10">
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
            whileHover={{ scale: 1.1 }}
            className="text-center cursor-default"
          >
            <div className="font-display font-black text-3xl md:text-5xl text-white tabular-nums drop-shadow-lg">
              {stat.value}
            </div>
            <div className="text-sm text-white/60 mt-1 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default StatsBar;
