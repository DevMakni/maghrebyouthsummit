import { motion } from "framer-motion";
import osdesignLogo from "@/assets/ZE.png";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const partners = [
  { name: "OsDesign", logo: osdesignLogo },
];

const PartnersSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].partners;
  return (
    <section id="partners" className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{t.slogan}</p>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-glow-white">
            {t.heading}
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.06, y: -4, transition: { duration: 0.25 } }}
                className="relative card-glass rounded-2xl px-10 py-8 flex flex-col items-center gap-4 cursor-default group"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;