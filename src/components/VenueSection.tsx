import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import amirPalaceImg from "@/assets/Amirpalace.jpg";
import shemsHolidayImg from "@/assets/shemsholiday.jpg";

const venues = [
  {
    name: "Amir Palace",
    location: "Monastir",
    tag: "Primary Hub",
    details: "High School Program, Awards, Orientation Village",
    image: amirPalaceImg,
  },
  {
    name: "Shems Holidays",
    location: "Monastir",
    tag: "Innovation Campus",
    details: "Opening Ceremony, Entrepreneurship Program, Hackathon, AI & Digital Program, University Awards",
    image: shemsHolidayImg,
  },
];

const VenueSection = () => (
  <section id="venue" className="relative py-24 md:py-32">
    <div className="absolute inset-0 section-overlay" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white text-center mb-16 text-glow-white"
      >
        Where
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {venues.map((venue, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="card-glass rounded-2xl overflow-hidden group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">
                {venue.tag}
              </span>
              <h3 className="font-display font-bold text-2xl text-white mb-1">{venue.name}</h3>
              <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                {venue.location}
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{venue.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VenueSection;
