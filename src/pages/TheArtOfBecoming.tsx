import { motion } from "framer-motion";
import { Sparkles, CalendarDays, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";
import heroBg from "@/assets/highschool.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const TYPE_STYLE: Record<string, { dot: string; badge: string; label: string }> = {
  logistics:     { dot: "bg-slate-400",    badge: "bg-slate-500/15 text-slate-300",      label: "Logistics" },
  meeting:       { dot: "bg-blue-400",     badge: "bg-blue-500/15 text-blue-300",        label: "Meeting" },
  ceremony:      { dot: "bg-violet-400",   badge: "bg-violet-500/15 text-violet-300",    label: "Ceremony" },
  meal:          { dot: "bg-emerald-400",  badge: "bg-emerald-500/15 text-emerald-300",  label: "Meal" },
  entertainment: { dot: "bg-purple-400",   badge: "bg-purple-500/15 text-purple-300",    label: "Show" },
  social:        { dot: "bg-pink-400",     badge: "bg-pink-500/15 text-pink-300",        label: "Social" },
  activity:      { dot: "bg-orange-400",   badge: "bg-orange-500/15 text-orange-300",    label: "Activity" },
  training:      { dot: "bg-violet-400",   badge: "bg-violet-500/15 text-violet-300",    label: "Training" },
  workshop:      { dot: "bg-violet-400",   badge: "bg-violet-500/15 text-violet-300",    label: "Workshop" },
  panel:         { dot: "bg-indigo-400",   badge: "bg-indigo-500/15 text-indigo-300",    label: "Panel" },
  break:         { dot: "bg-slate-600",    badge: "bg-slate-500/10 text-slate-500",      label: "Break" },
};

interface Program {
  id: string; start: string; end: string;
  title: string; subtitle?: string; type: string;
  parallelCount?: number;
}
interface DayData { day: number; programs: Program[]; }

const days: DayData[] = [
  {
    day: 1,
    programs: [
      { id: "d1-1", start: "14:00", end: "16:00", title: "Check In", subtitle: "The Gateway", type: "logistics" },
      { id: "d1-2", start: "16:00", end: "16:45", title: "High School Presidents Meeting", type: "meeting" },
      { id: "d1-3", start: "17:00", end: "19:00", title: "Opening Ceremony", type: "ceremony" },
      { id: "d1-4", start: "19:00", end: "21:00", title: "Dinner", type: "meal" },
      { id: "d1-5", start: "21:00", end: "22:00", title: "Challenge", type: "activity" },
      { id: "d1-6", start: "22:00", end: "00:00", title: "Training Sessions", type: "training", parallelCount: 3 },
      { id: "d1-7", start: "23:00", end: "01:00", title: "Team Building & Stand Up", type: "activity" },
    ],
  },
  {
    day: 2,
    programs: [
      { id: "d2-1", start: "07:00", end: "08:00", title: "Breakfast", type: "meal" },
      { id: "d2-2", start: "08:00", end: "10:00", title: "Workshops Part 1", type: "workshop", parallelCount: 3 },
      { id: "d2-3", start: "10:00", end: "12:00", title: "Workshops Part 2", type: "workshop", parallelCount: 3 },
      { id: "d2-4", start: "12:00", end: "14:00", title: "Lunch", type: "meal" },
      { id: "d2-5", start: "14:00", end: "16:00", title: "Panels Part 1", type: "panel", parallelCount: 3 },
      { id: "d2-6", start: "16:00", end: "18:00", title: "Orientation Session & Panel Part 2", type: "panel" },
      { id: "d2-7", start: "19:00", end: "21:00", title: "Dinner", type: "meal" },
      { id: "d2-8", start: "21:00", end: "21:30", title: "Show", type: "entertainment" },
      { id: "d2-9", start: "21:30", end: "23:00", title: "Film Screening", type: "entertainment" },
      { id: "d2-10", start: "23:00", end: "01:00", title: "Party", type: "social" },
    ],
  },
  {
    day: 3,
    programs: [
      { id: "d3-1", start: "07:00", end: "08:00", title: "Breakfast", type: "meal" },
      { id: "d3-2", start: "08:00", end: "10:00", title: "Simulation", type: "activity" },
      { id: "d3-3", start: "10:00", end: "12:00", title: "Closing Ceremony", type: "ceremony" },
    ],
  },
];

const DAY_DATES = ["April 10", "April 11", "April 12"];

function ProgramRow({ prog }: { prog: Program }) {
  const s = TYPE_STYLE[prog.type] || TYPE_STYLE.activity;
  const isBreak = prog.type === "break";
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-all ${isBreak ? "border-white/5 opacity-50" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}>
      <div className="min-w-[72px] text-right shrink-0 pt-0.5">
        <span className="text-xs font-mono font-bold text-white/80 block">{prog.start}</span>
        <span className="text-[10px] font-mono text-white/30 block">- {prog.end === "late" ? "Late" : prog.end}</span>
      </div>
      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${s.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
          {prog.subtitle && <span className="text-xs text-white/40 italic">{prog.subtitle}</span>}
        </div>
        <p className={`font-semibold text-sm leading-snug ${isBreak ? "text-white/40" : "text-white"}`}>{prog.title}</p>
        {prog.parallelCount && (
          <div className="flex items-center flex-wrap gap-2 mt-2">
            {Array.from({ length: prog.parallelCount }).map((_, i) => (
              <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Session {i + 1}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const TheArtOfBecoming = () => {
  const { lang } = useLanguage();
  const tp = translations[lang].programPages;
  const t = tp.artOfBecoming;

  return (
    <div className="min-h-screen text-white relative">
      <div
        className="fixed inset-0 -z-10"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(8px)", transform: "scale(1.1)" }}
      />
      <div className="fixed inset-0 -z-10 bg-black/70" />
      <div className="relative min-h-screen">
        <Navbar />

        {/* HERO */}
        <section className="relative min-h-[70vh] flex items-center justify-center text-center pt-28 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(270_70%_55%/0.2)_0%,transparent_70%)]" />
          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-violet-500/10 ring-1 ring-violet-500/30 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-violet-400 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.badge}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6"
            >
              <span className="text-white">{t.heading1} </span>
              <span className="text-violet-400">{t.heading2}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              {t.desc}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="/register" className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-violet-600/30 hover:scale-105 transition-all duration-300">

                {tp.registerNow}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <CalendarDays className="w-4 h-4 text-violet-400" />
                {tp.date}
                <span className="mx-2 text-white/20">|</span>
                <MapPin className="w-4 h-4 text-violet-400" />
                {tp.location}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FULL PROGRAM */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 ring-1 ring-violet-500/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-violet-400 mb-5">
                <CalendarDays className="w-3.5 h-3.5" />
                {tp.fullProgram}
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mt-3">
                {t.programHeading}
              </h2>
            </div>

            <div className="space-y-24">
              {days.map((dayData, di) => (
                <motion.div
                  key={dayData.day}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: di * 0.05 }}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-violet-600 flex flex-col items-center justify-center shadow-lg shadow-violet-600/30 shrink-0">
                      <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Day</span>
                      <span className="text-white font-black text-2xl leading-none">{dayData.day}</span>
                    </div>
                    <div>
                      <p className="text-violet-400 text-xs font-bold tracking-widest uppercase">{DAY_DATES[di]}, 2026</p>
                      <p className="text-white font-black text-xl mt-0.5">{t.dayTitles[di]}</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent hidden sm:block" />
                  </div>

                  <div className="space-y-2 relative pl-5 md:pl-8 border-l-2 border-violet-500/20 ml-3">
                    {dayData.programs.map((prog, pi) => (
                      <motion.div
                        key={prog.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: pi * 0.03 }}
                      >
                        <ProgramRow prog={prog} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <a href="/register" className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-violet-600/25 hover:scale-105 transition-all duration-300">

                {tp.registerNow}
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-white/10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <img src={logoWhite} alt="Maghreb Youth Summit" className="h-8 opacity-70" />
            <p className="text-xs text-white/40">{tp.copyright}</p>
            <a href="/" className="text-xs text-white/50 hover:text-white transition-colors">{tp.backHome}</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TheArtOfBecoming;