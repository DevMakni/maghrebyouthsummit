import { motion } from "framer-motion";
import { Mic2, Users, FlaskConical, Monitor, PartyPopper, Trophy } from "lucide-react";

const highlights = [
  { icon: Mic2, title: "Opening Ceremony" },
  { icon: Users, title: "Panels & Conferences" },
  { icon: FlaskConical, title: "Innovation Labs (AI, Robotics, Gaming, Digital)" },
  { icon: Monitor, title: "Tech Exhibition & Arena" },
  { icon: PartyPopper, title: "Networking & Entertainment Nights" },
  { icon: Trophy, title: "Awards Ceremonies" },
];

const HighlightsSection = () => (
  <section className="relative py-24 md:py-32">
    <div className="absolute inset-0 section-overlay-strong" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
      >
        What to Expect
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="card-glass rounded-2xl p-6 flex items-center gap-4 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
              <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <span className="font-display font-bold text-white">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HighlightsSection;
