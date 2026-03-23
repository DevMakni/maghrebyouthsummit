import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  return (
  <section id="about" className="relative py-24 md:py-32">
    <div className="absolute inset-0 section-overlay" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-3xl mx-auto text-center mb-20"
      >
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white mb-6 text-glow-white">
          {t.heading}
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          {t.body}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {t.cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative card-glass rounded-2xl p-7 cursor-default overflow-hidden flex flex-col items-center text-center"
          >
            {/* top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* subtle red glow blob */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 leading-tight">
              {card.title}
            </h3>
            <p className="text-sm text-white/55 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
