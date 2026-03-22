import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Users, Lightbulb, Target, Rocket, BookOpen, CalendarDays, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  }),
};

const highlights = [
  { icon: Briefcase, title: "Business Fundamentals", desc: "Apprenez les bases de la creation d'entreprise, du business model a la strategie de marche." },
  { icon: TrendingUp, title: "Growth & Scaling", desc: "Decouvrez les methodes eprouvees pour faire croitre une startup de l'idee au marche." },
  { icon: Users, title: "Networking", desc: "Connectez-vous avec des entrepreneurs confirmes et des investisseurs de la region." },
  { icon: Lightbulb, title: "Innovation Workshop", desc: "Participez a des ateliers pratiques de design thinking et d'ideation structuree." },
];

const ProgrammeEntrepreneuriat = () => (
  <div className="min-h-screen text-white">
    <Navbar />

    {/* ── HERO ── */}
    <section className="relative min-h-[75vh] flex items-center justify-center text-center pt-28 pb-20">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_80%_50%/0.12)_0%,transparent_65%)]" />
      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 ring-1 ring-amber-500/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-8"
        >
          <Target className="w-3.5 h-3.5" />
          Parcours 1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6"
        >
          <span className="text-white text-glow-white">Programme </span>
          <span className="text-amber-400">Entrepreneuriat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/65 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          Un parcours intensif dedie a l'entrepreneuriat, couvrant toutes les etapes de la creation d'entreprise — de l'ideation au pitch devant des investisseurs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/#register"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            Register Now
          </a>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <CalendarDays className="w-4 h-4 text-amber-400" />
            10-12 Avril 2026
            <span className="mx-2 text-white/20">|</span>
            <MapPin className="w-4 h-4 text-amber-400" />
            Monastir, Tunisia
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── HIGHLIGHTS ── */}
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
        >
          What You'll Learn
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/60 text-center max-w-xl mx-auto mb-14"
        >
          Un programme complet pour transformer votre idee en projet viable.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-glass rounded-2xl p-8 text-center group ring-1 ring-white/10"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-500/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300">
                <h.icon className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{h.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── COMING SOON NOTICE ── */}
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_80%_50%/0.08)_0%,transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass rounded-2xl p-10 ring-1 ring-amber-500/20"
        >
          <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-display font-bold text-2xl text-white mb-3">Programme Detaille — Bientot Disponible</h3>
          <p className="text-white/55 mb-6">
            Le programme complet avec les sessions, speakers et ateliers sera annonce prochainement. Inscrivez-vous pour etre notifie des la publication.
          </p>
          <a
            href="/#register"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Get Notified
          </a>
        </motion.div>
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer className="relative py-8 border-t border-white/10">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logoWhite} alt="Maghreb Youth Summit" className="h-8 opacity-70" />
        <p className="text-xs text-white/40">© 2026 Maghreb Youth Summit. All rights reserved.</p>
        <a href="/" className="text-xs text-white/50 hover:text-white transition-colors">← Back to Home</a>
      </div>
    </footer>
  </div>
);

export default ProgrammeEntrepreneuriat;
