import { motion } from "framer-motion";
import entrepreneurshipImg from "@/assets/entrepreuneurship.jpg";
import hackathonImg from "@/assets/hackton.jpg";
import aiImg from "@/assets/ai.jpg";
import highschoolImg from "@/assets/highschool.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const trackImages = [entrepreneurshipImg, hackathonImg, aiImg, highschoolImg];

const ProgramSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].program;
  const tracks = t.tracks.map((track, i) => ({ ...track, image: trackImages[i] }));
  return (
  <section id="program" className="relative py-24 md:py-32">
    <div className="absolute inset-0 section-overlay" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
      >
        {t.heading}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {tracks.map((track, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="card-glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display font-bold text-xl text-white mb-3">{track.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{track.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ProgramSection;
