import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
  

const fadeUp = {  
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.2, 0, 0, 1] },
  }),
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(355_75%_50%_/_0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.img
            src={logoWhite}
            alt="Maghreb Youth Summit 2026"
            className="mx-auto h-16 md:h-24 mb-4 drop-shadow-2xl"
            custom={0}
            
          />

          <motion.h1
            custom={1}
        
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.9] drop-shadow-lg"
          >
            MAGHREB YOUTH
            <br />
            <motion.span
              className="text-glow text-primary inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              SUMMIT
            </motion.span>
          </motion.h1>

          <motion.p
            custom={2}
        
            className="text-lg md:text-xl text-white/70 font-medium tracking-wide"
          >
            2026 — Monastir, Tunisia
          </motion.p> 

          <motion.div
            custom={4}
           
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <motion.a
              href="#register"
              className="bg-primary text-white font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.secureYourSeat}
            </motion.a>
            <motion.a
              href="#about"
              className="ring-1 ring-white/20 text-white font-bold px-8 py-4 rounded-full text-base backdrop-blur-sm hover:ring-white/40 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.discoverEvent}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full ring-2 ring-white/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
