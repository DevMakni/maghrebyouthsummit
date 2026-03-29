import { motion } from "framer-motion";
import { Target, CalendarDays, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";
import heroBg from "@/assets/entrepreuneurship.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const TYPE_STYLE: Record<string, { dot: string; badge: string; label: string }> = {
  logistics:     { dot: "bg-slate-400",   badge: "bg-slate-500/15 text-slate-300",     label: "Logistics" },
  meeting:       { dot: "bg-blue-400",    badge: "bg-blue-500/15 text-blue-300",       label: "Meeting" },
  ceremony:      { dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300",     label: "Ceremony" },
  meal:          { dot: "bg-emerald-400", badge: "bg-emerald-500/15 text-emerald-300", label: "Meal" },
  entertainment: { dot: "bg-purple-400",  badge: "bg-purple-500/15 text-purple-300",   label: "Show" },
  social:        { dot: "bg-pink-400",    badge: "bg-pink-500/15 text-pink-300",       label: "Social" },
  activity:      { dot: "bg-orange-400",  badge: "bg-orange-500/15 text-orange-300",   label: "Activity" },
  talk:          { dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300",     label: "Session" },
  panel:         { dot: "bg-indigo-400",  badge: "bg-indigo-500/15 text-indigo-300",   label: "Panel" },
  workshop:      { dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300",     label: "Workshop" },
  break:         { dot: "bg-slate-600",   badge: "bg-slate-500/10 text-slate-500",     label: "Break" },
};

interface Program {
  id: string; start: string; end: string;
  title: string; subtitle?: string; type: string;
}
interface WayTrack { track_id: string; track_title: string; programs: Program[]; }
interface Section {
  id: string; title: string;
  programs?: Program[];
  ways?: WayTrack[];
}
interface DayData { day: number; day_title?: string; sections: Section[]; }

const days: DayData[] = [
  {
    day: 1,
    sections: [
      {
        id: "d1-s1",
        title: "The Threshold: Peak Entrance",
        programs: [
          { id: "d1-1", start: "14:00", end: "16:00", title: "The Gateway", subtitle: "Check In", type: "logistics" },
          { id: "d1-2", start: "16:00", end: "16:45", title: "The Presidential Summit", type: "meeting" },
          { id: "d1-3", start: "17:00", end: "19:00", title: "The Opening Ceremony", type: "ceremony" },
        ],
      },
      {
        id: "d1-s2",
        title: "The Collective: Power in Unity",
        programs: [
          { id: "d1-4", start: "19:00", end: "21:00", title: "The Elite Dining", type: "meal" },
          { id: "d1-5", start: "21:00", end: "21:30", title: "The Spotlight Show", type: "entertainment" },
          { id: "d1-6", start: "22:00", end: "23:30", title: "Stand-up", type: "entertainment" },
        ],
      },
      {
        id: "d1-s3",
        title: "The Infinite: Beyond the Horizon",
        programs: [
          { id: "d1-7", start: "00:00", end: "late", title: "The Midnight Pulse", type: "social" },
        ],
      },
    ],
  },
  {
    day: 2,
    day_title: "Entrepreneurial Excellence Program",
    sections: [
      {
        id: "d2-s1",
        title: "Morning Session",
        programs: [
          { id: "d2-1", start: "08:00", end: "09:30", title: "Team Pulse", type: "activity" },
          { id: "d2-2", start: "10:00", end: "11:00", title: "Entrepreneurial Success", type: "talk" },
          { id: "d2-3", start: "11:00", end: "11:15", title: "Break", type: "break" },
          { id: "d2-4", start: "11:15", end: "12:30", title: "Success Stories Panel", type: "panel" },
          { id: "d2-5", start: "12:30", end: "13:30", title: "Lunch Break", type: "meal" },
        ],
      },
      {
        id: "d2-s2",
        title: "Afternoon Session - Expert Ways",
        ways: [
          {
            track_id: "way1",
            track_title: "Way 1: Business Design & Strategy",
            programs: [
              { id: "d2-w1-1", start: "13:30", end: "15:00", title: "Business Model Design", subtitle: "BMC", type: "workshop" },
              { id: "d2-w1-2", start: "15:00", end: "15:15", title: "Break", type: "break" },
              { id: "d2-w1-3", start: "15:15", end: "16:45", title: "Market Analysis", subtitle: "PESTEL & SWOT", type: "workshop" },
              { id: "d2-w1-4", start: "18:00", end: "19:30", title: "Applied Workshop", type: "workshop" },
            ],
          },
          {
            track_id: "way2",
            track_title: "Way 2: Sales & Personal Branding",
            programs: [
              { id: "d2-w2-1", start: "13:30", end: "15:00", title: "Sales Techniques & Commercial Communication", type: "workshop" },
              { id: "d2-w2-2", start: "15:00", end: "15:15", title: "Break", type: "break" },
              { id: "d2-w2-3", start: "15:15", end: "16:45", title: "Personal Branding", type: "workshop" },
              { id: "d2-w2-4", start: "18:00", end: "19:30", title: "Applied Workshop", type: "workshop" },
            ],
          },
        ],
      },
    ],
  },
  {
    day: 3,
    sections: [
      {
        id: "d3-s1",
        title: "The Finale: Rise & Shine",
        programs: [
          { id: "d3-1", start: "07:00", end: "08:30", title: "Fresh Start", subtitle: "Breakfast", type: "meal" },
          { id: "d3-2", start: "08:30", end: "11:00", title: "Panel CIFE", type: "panel" },
          { id: "d3-3", start: "11:00", end: "12:00", title: "The Final Chapter", subtitle: "Closing Ceremony", type: "ceremony" },
          { id: "d3-4", start: "12:00", end: "12:30", title: "The Final Gate", subtitle: "Check-out", type: "logistics" },
        ],
      },
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
      </div>
    </div>
  );
}

const ProgrammeEntrepreneuriat = () => {
  const { lang } = useLanguage();
  const tp = translations[lang].programPages;
  const t = tp.entrepreneuriat;

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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_80%_50%/0.2)_0%,transparent_70%)]" />
          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6"
            >
              <span className="text-white">{t.heading1} </span>
              <span className="text-amber-400">{t.heading2}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              {t.desc}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="/register" className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-500/30 hover:scale-105 transition-all duration-300">

                {tp.registerNow}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <CalendarDays className="w-4 h-4 text-amber-400" />
                {tp.date}
                <span className="mx-2 text-white/20">|</span>
                <MapPin className="w-4 h-4 text-amber-400" />
                {tp.location}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FULL PROGRAM */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 ring-1 ring-amber-500/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-5">
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
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 flex flex-col items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                      <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Day</span>
                      <span className="text-white font-black text-2xl leading-none">{dayData.day}</span>
                    </div>
                    <div>
                      <p className="text-amber-400 text-xs font-bold tracking-widest uppercase">{DAY_DATES[di]}, 2026</p>
                      <p className="text-white font-black text-xl mt-0.5">
                        {dayData.day_title || t.dayTitles[dayData.day === 1 ? 0 : 2]}
                      </p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent hidden sm:block" />
                  </div>

                  <div className="space-y-8 relative pl-5 md:pl-8 border-l-2 border-amber-500/20 ml-3">
                    {dayData.sections.map((section, si) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: si * 0.07 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500/50 -ml-[25px] md:-ml-[37px] shrink-0" />
                          <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400/70">{section.title}</p>
                        </div>

                        {section.ways ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {section.ways.map(way => (
                              <div key={way.track_id} className="border border-amber-500/20 rounded-2xl p-4 bg-amber-500/5">
                                <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-3 pb-3 border-b border-white/10">
                                  {way.track_title}
                                </p>
                                <div className="space-y-2">
                                  {way.programs.map(prog => (
                                    <ProgramRow key={prog.id} prog={prog} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.programs?.map(prog => (
                              <ProgramRow key={prog.id} prog={prog} />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <a href="/register" className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-amber-500/25 hover:scale-105 transition-all duration-300">

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

export default ProgrammeEntrepreneuriat;