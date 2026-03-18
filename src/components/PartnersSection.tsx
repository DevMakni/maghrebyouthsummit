import { motion } from "framer-motion";

const PartnersSection = () => (
  <section id="partners" className="relative py-24 md:py-32">
    <div className="absolute inset-0 section-overlay-strong" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
      >
        Our Partners
      </motion.h2>

      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest text-center mb-8">Partners</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="card-glass rounded-xl aspect-[3/2] flex items-center justify-center text-white/40 text-xs hover:text-white/60 transition-colors cursor-default"
              >
                Logo
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest text-center mb-8">Media Partners</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="card-glass rounded-xl aspect-[3/2] flex items-center justify-center text-white/40 text-xs hover:text-white/60 transition-colors cursor-default"
              >
                Logo
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
