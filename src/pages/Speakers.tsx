import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

/* ---------- speaker photo resolver (Vite asset pipeline) ---------- */
const speakerImageModules = import.meta.glob<{ default: string }>(
  '/src/assets/speakers_pics/*',
  { eager: true }
);

function getSpeakerPhoto(photo: string): string {
  if (!photo) return '';
  if (photo.startsWith('http')) return photo;
  const key = `/src/assets/speakers_pics/${photo}`;
  if (speakerImageModules[key]) return speakerImageModules[key].default;
  // fallback: case-insensitive match
  const lower = photo.toLowerCase();
  const match = Object.keys(speakerImageModules).find(
    k => k.split('/').pop()?.toLowerCase() === lower
  );
  return match ? speakerImageModules[match].default : '';
}

/* ---------- speaker data ---------- */
interface Speaker {
  name: string;
  title: string;
  org: string;
  photo: string;
  bio: string;
}

const SPEAKERS: Speaker[] = [


{ name: "Dorra Zribi", title: "Med student", org: "", photo: "Zribi Dorra.png", bio: "A medical student at FMT and National Reading Champion 2022,she is a passionate advocate for knowledge, growth, and impact.As a member of the Digital Panel – Future Voices, she brings fresh perspectives,innovative ideas, and a commitment to inspiring change. Beyond her studies , she uses her platform as an influencer to motivate others, turning insights into action and knowledge into meaningful impact." },

{ name: "Emna Ben Salah", title: "Expert-comptable associée chez A&B Audit", org: "", photo: "emnabensalah.jpeg", bio: "25+ years of experience in financial strategy, supporting businesses across Tunisia, France and Côte d’Ivoire , and promoting women’s entrepreneurship." },

{ name: "Maram Lahbib", title: "Digital creator & CEO", org: "", photo: "Maram Lahbib.jpg", bio: "founder of Glorea Career, sharing career strategies and helping talents grow internationally." },

{ name: "Sandra Aouadi", title: "Leisure manager & event coordinator", org: "", photo: "Sandra Aouadi.jpg", bio: "specialized in creating impactful events and networking opportunities. Engaged in humanitarian work, she connects people and designs experiences that turn connections into real opportunities." },

{ name: "Baha Haouas", title: "Content Creator ", org: "", photo: "Baha Haouas.jfif", bio: "A Content Creator and Video Editor who crafts engaging digital content, blending creativity and storytelling to create impactful visuals and emotional experiences." },

{ name: "Ahmed Maknine", title: "Content Strategist", org: "", photo: "ahmed maknin.jfif", bio: "A Content Strategist who simplifies finance and technology through clear, engaging content." },

{ name: "Sedik Dimassi", title: "Entrepreneur & founder of Zemny.co", org: "", photo: "sadik dimassi.png", bio: "Entrepreneur blending tradition with technology. Founder of Zemny.co, bringing authentic Tunisian products online while supporting local artisans." },

{name: "Hedi Ghilene", title: "Coach professionnel | Expert Soft Skills ", org: "", photo: "hedi ghilene.jpg", bio: "Coach & trainer expert en soft skills, avec 12+ ans d’expérience en communication, management et relation client."},

{name: "Chahd Fourti", title: "Business student | founder of Choucha Shoots", org: "", photo: "Chahd Fourti.jpg", bio: "Business student and photographer, founder of Choucha Shoots, capturing meaningful moments and transforming them into visual stories."},

{name: "Ismaail laabidi", title: "Creative Director & AI Content Expert", org: "", photo: "Ismaail laabidi.jpg", bio: "specializing in viral content, combining creativity with artificial intelligence. Passionate about digital innovation, social media strategy and transforming marketing through AI."},

{name: "Roua Walha", title: "Content Creator", org: "", photo: "Roua Walha.jfif", bio: "Finance & AI Content Creator with a strong community, turning complex concepts into simple, engaging, and actionable insights."},

{name: "Mariem Ben Tanfous", title: "Professionneure et executive coach", org: "", photo: "mariem ben tanfous.png", bio: "elle est spécialisée en leadership, communication exécutive et performance humaine. Elle accompagne dirigeants et managers à révéler leur plein potentiel en combinant stratégie, neurosciences et intelligence collective. Présidente de CIFE NextGen, elle s’engage à développer une nouvelle génération de leaders à impact durable."},

{name: "Maryem Aouinet", title: "Professeure de français | créatrice de contenus", org: "", photo: "Aouinet Myriam.jpg", bio: "Professeure de français et créatrice de contenus éducatifs, elle accompagne les élèves vers la réussite scolaire grâce à des méthodes modernes, accessibles et motivantes. À travers ses vidéos et podcasts, elle simplifie l’apprentissage et aide les jeunes à mieux s’organiser, progresser et se comprendre."},

{name: "Chahd Krid", title: "Political science student, youth leader & founder of Visualize Sfax Club", org: "", photo: "chahd krid.jpg", bio: "Political Science student passionate about diplomacy and international relations, youth leader and founder of Visualize Sfax Club, content creator and radio host, proudly representing Tunisia internationally."},

{name: "Rahma Naija", title: "Med student", org: "", photo: "Rahma Naija.jpg", bio: "A voice of ambition and authenticity, bringing fresh perspectives and real talk to the stage."},

{name: "Maram Zmerli", title: "Médecin & résidente en psychiatrie", org: "", photo: "maram zmerli.jpg", bio: "Médecin et résidente en psychiatrie, également coach certifiée en PNL. Elle accompagne le développement personnel et la préparation mentale pour aider chacun à révéler son potentiel."},

{name: "Youssef Taktak", title: "Content Creator", org: "", photo: "youssef taktak.jpg", bio: "A voice that inspires, challenges, and pushes boundaries"},

];

const ONE_PERCENT: Speaker[] = [
  { name: " Mohamed souissi", title: "Actor |  Audiovisuel specialist | Comedian", org: "", photo: "Mohamed souissi.png", bio: "An experienced audiovisual technician with over 10 years of international experience. His background in theater, film, and television also strengthens his creativity, communication, and teamwork skills." },  
  { name: " Ahmed Landolsi", title: "Artist | Actor", org: "", photo: "ahmed landolsi.png", bio: "A Tunisian actor known for playing roles in TV series and has a casting agency for commercials, clips and figurations for variety shows" },
  { name: " Amira Derouiche", title: "Actress & Producer", org: "", photo: "amira derouiche.png", bio: "Actress & Producer blending performance and production to tell powerful stories and evoke emotion across stage and screen." },
];

const INTERNATIONAL: Speaker[] = [
  { name: "Dr. Sarah Mitchell", title: "AI Research Lead", org: "DeepMind", photo: "https://i.pravatar.cc/300?img=32", bio: "Leading responsible AI research. Published 50+ papers in top ML conferences." },
  { name: "Prof. Jean-Luc Moreau", title: "Dean of Innovation", org: "HEC Paris", photo: "https://i.pravatar.cc/300?img=52", bio: "Shaping the next generation of global business leaders for 20 years." },
  { name: "Amina Razak", title: "VP of Strategy", org: "Google EMEA", photo: "https://i.pravatar.cc/300?img=44", bio: "Driving Google's growth strategy across Europe, Middle East and Africa." },
  { name: "Dr. Marcus Webb", title: "Partner", org: "McKinsey & Company", photo: "https://i.pravatar.cc/300?img=53", bio: "Advising governments and multinationals on digital transformation at scale." },
];

/* ---------- tier style config ---------- */
type Tier = "standard" | "elite" | "international";

const TIER: Record<Tier, {
  glow: string; glowHover: string; ring: string; accent: string;
  stamp: string; stampColor: string; shimmerGrad: string; photoBorder: string;
}> = {
  standard: {
    glow: "rgba(255,255,255,0.15)",
    glowHover: "0 0 30px rgba(255,255,255,0.12)",
    ring: "ring-white/10",
    accent: "text-primary",
    stamp: "CONFIRMED",
    stampColor: "text-emerald-400 border-emerald-400",
    shimmerGrad: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
    photoBorder: "ring-white/20",
  },
  elite: {
    glow: "rgba(234,179,8,0.3)",
    glowHover: "0 0 40px rgba(234,179,8,0.2), 0 0 80px rgba(234,179,8,0.08)",
    ring: "ring-yellow-500/20",
    accent: "text-yellow-400",
    stamp: "TOP SECRET \u2192 CONFIRMED",
    stampColor: "text-yellow-400 border-yellow-400",
    shimmerGrad: "linear-gradient(135deg, transparent 20%, rgba(234,179,8,0.1) 40%, rgba(245,158,11,0.06) 60%, transparent 80%)",
    photoBorder: "ring-yellow-500/30",
  },
  international: {
    glow: "rgba(34,211,238,0.25)",
    glowHover: "0 0 35px rgba(34,211,238,0.15), 0 0 70px rgba(34,211,238,0.06)",
    ring: "ring-cyan-500/20",
    accent: "text-cyan-400",
    stamp: "GLOBAL ACCESS GRANTED",
    stampColor: "text-cyan-400 border-cyan-400",
    shimmerGrad: "linear-gradient(135deg, transparent 25%, rgba(34,211,238,0.08) 45%, rgba(56,189,248,0.05) 65%, transparent 85%)",
    photoBorder: "ring-cyan-500/30",
  },
};

/* ---------- gift box reveal ---------- */
function GiftBoxReveal({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"idle" | "untie" | "open" | "done">("idle");
  const done = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onDone();
  }, [onDone]);

  /* animation timeline — uses refs so StrictMode can't break it */
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    ids.push(setTimeout(() => setPhase("untie"), 500));
    ids.push(setTimeout(() => setPhase("open"), 1800));
    ids.push(setTimeout(() => setPhase("done"), 3200));
    ids.push(setTimeout(() => finish(), 3800));
    return () => ids.forEach(clearTimeout);
  }, [finish]);

  /* particles on open */
  useEffect(() => {
    if (phase !== "open") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const W = (canvas.width = canvas.offsetWidth * 2);
    const H = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(2, 2);
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; life: number; max: number }
    const pts: P[] = [];
    for (let i = 0; i < 50; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 1 + Math.random() * 3;
      pts.push({ x: w / 2, y: h / 2, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 1.5, r: 1.5 + Math.random() * 2.5, a: 0.7 + Math.random() * 0.3, life: 0, max: 50 + Math.random() * 50 });
    }
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life++;
        const alpha = p.a * (1 - p.life / p.max);
        if (alpha <= 0) { pts.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(355,75%,60%,${alpha})`; ctx.fill();
      }
      if (pts.length) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      style={{ background: "radial-gradient(ellipse at center, hsl(220 20% 10%) 0%, hsl(220 20% 4%) 100%)" }}
      onClick={finish}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* light rays on open */}
      {phase === "open" && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-bottom-left"
              style={{ rotate: i * 45, width: 3, height: "50vh", background: "linear-gradient(to top, hsla(355,75%,50%,0.3), transparent)" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: [0, 0.5, 0.15] }}
              transition={{ duration: 1, delay: i * 0.04 }}
            />
          ))}
        </div>
      )}

      {/* particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* box */}
      <div className="relative" style={{ width: 200, height: 220 }}>
        {/* base */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-xl overflow-hidden"
          style={{ height: 130, background: "linear-gradient(135deg, hsl(355 70% 40%), hsl(355 80% 30%))", boxShadow: "0 20px 60px hsla(355,75%,20%,0.6), inset 0 1px 0 hsla(0,0%,100%,0.15)" }}
          animate={phase === "open" ? { y: 30, opacity: 0, scale: 0.9 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-8 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" /></div>
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-b from-yellow-400/25 via-yellow-400/40 to-yellow-400/25" />
        </motion.div>

        {/* lid */}
        <motion.div
          className="absolute top-0 left-[-10px] right-[-10px] rounded-xl overflow-hidden"
          style={{ height: 65, transformOrigin: "top center", background: "linear-gradient(135deg, hsl(355 75% 45%), hsl(355 80% 35%))", boxShadow: "0 4px 20px hsla(355,75%,20%,0.4)" }}
          animate={
            phase === "open" ? { rotateX: -120, y: -80, opacity: 0 }
            : phase === "untie" ? { y: [0, -8, 0] }
            : {}
          }
          transition={phase === "untie" ? { duration: 0.4, repeat: 2, ease: "easeInOut" } : { duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-5 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" /></div>
        </motion.div>

        {/* bow */}
        <motion.div
          className="absolute top-[18px] left-1/2 -translate-x-1/2 z-10"
          animate={phase === "untie" ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <div className="relative w-20 h-12">
            <div className="absolute top-1 left-0 w-9 h-10 rounded-full border-[3px] border-yellow-400 bg-yellow-400/10" style={{ transform: "rotate(-30deg)" }} />
            <div className="absolute top-1 right-0 w-9 h-10 rounded-full border-[3px] border-yellow-400 bg-yellow-400/10" style={{ transform: "rotate(30deg)" }} />
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
          </div>
          <div className="flex justify-center gap-3 -mt-1">
            <div className="w-2 h-14 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full -rotate-6" />
            <div className="w-2 h-14 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full rotate-6" />
          </div>
        </motion.div>

        {/* reveal text */}
        <AnimatePresence>
          {phase === "open" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="font-display font-black text-2xl text-white tracking-tight">Speakers</p>
                <p className="text-xs text-white/50 mt-1 tracking-wider uppercase">Revealed</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* skip hint */}
      <motion.p
        className="absolute bottom-12 text-xs text-white/25 tracking-wider uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Tap anywhere to skip
      </motion.p>
    </motion.div>
  );
}

/* ---------- section title (fade-up on scroll) ---------- */
function SectionTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      {text}
    </motion.h2>
  );
}

/* ---------- classified stamp ---------- */
function Stamp({ label, colorClass, show }: { label: string; colorClass: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 2.5, rotate: -15 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [2.5, 1, 1, 1], rotate: [-15, -12, -12, -12] }}
          transition={{ duration: 1.6, times: [0, 0.15, 0.7, 1] }}
        >
          <div className={`border-4 ${colorClass} px-4 py-2 rounded-md font-display font-black text-sm md:text-base tracking-wider uppercase`} style={{ textShadow: "0 0 20px currentColor" }}>
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- speaker card ---------- */
function SpeakerCard({ speaker, index, tier, globalDelay }: { speaker: Speaker; index: number; tier: Tier; globalDelay: number }) {
  const cfg = TIER[tier];
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState<"classified" | "revealing" | "stamp" | "revealed">("classified");
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: 50 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const base = globalDelay + index * 250;
    const t1 = setTimeout(() => setPhase("revealing"), base);
    const t2 = setTimeout(() => setPhase("stamp"), base + 800);
    const t3 = setTimeout(() => setPhase("revealed"), base + 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView, index, globalDelay]);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (ny - 0.5) * -18, y: (nx - 0.5) * 18, shine: nx * 100 });
  }, []);

  const resetTilt = useCallback(() => { setTilt({ x: 0, y: 0, shine: 50 }); setHovering(false); }, []);

  const isClassified = phase === "classified";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: globalDelay / 1000 + index * 0.08 }}
      className="relative"
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={resetTilt}
      style={{ perspective: 1000 }}
    >
      <div
        className={`relative rounded-2xl p-6 ring-1 ${cfg.ring} overflow-hidden bg-[rgba(10,10,20,0.55)] backdrop-blur-xl`}
        style={{
          transform: hovering
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovering
            ? "transform 0.08s ease-out, box-shadow 0.3s ease"
            : "transform 0.5s cubic-bezier(0.2,0,0,1), box-shadow 0.5s ease",
          boxShadow: hovering ? cfg.glowHover : "0 8px 32px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* shimmer overlay follows cursor */}
        {hovering && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-60"
            style={{ background: cfg.shimmerGrad, backgroundPosition: `${tilt.shine}% 50%`, backgroundSize: "200% 200%", transition: "background-position 0.1s ease" }}
          />
        )}

        {/* glow pulse ring */}
        {hovering && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${cfg.glow}, 0 0 20px ${cfg.glow}`, animation: "glowPulse 2s ease-in-out infinite" }} />
        )}

        {/* CLASSIFIED overlay */}
        <AnimatePresence>
          {isClassified && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 rounded-2xl"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-8 h-8 text-red-500/70 mb-2" />
              <div className="border-2 border-red-500/50 text-red-500/80 px-3 py-1 rounded font-display font-black text-xs tracking-[0.25em] uppercase" style={{ transform: "rotate(-6deg)" }}>
                CLASSIFIED
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* stamp */}
        <Stamp label={cfg.stamp} colorClass={cfg.stampColor} show={phase === "stamp"} />

        {/* content */}
        <div className="flex flex-col items-center text-center relative z-[5]">
          <div className={`w-24 h-24 rounded-full overflow-hidden ring-2 ${cfg.photoBorder} mb-4 shadow-lg transition-all duration-700 ${isClassified ? "blur-md scale-90 grayscale" : "blur-0 scale-100 grayscale-0"}`}>
            <img src={getSpeakerPhoto(speaker.photo)} alt={speaker.name} className="w-full h-full object-cover" loading="lazy" />
          </div>

          <div className="h-7 mb-1 flex items-center justify-center">
            {isClassified ? (
              <div className="flex gap-1">
                <div className="h-4 w-16 bg-white/20 rounded-sm" />
                <div className="h-4 w-20 bg-white/20 rounded-sm" />
              </div>
            ) : (
              <h3 className="font-display font-bold text-base text-white">{speaker.name}</h3>
            )}
          </div>

          <motion.div animate={{ opacity: isClassified ? 0 : 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="text-sm text-white/60">{speaker.title}</p>
            <p className={`text-xs font-medium mt-0.5 ${cfg.accent}`}>{speaker.org}</p>
          </motion.div>

          {/* bio slide-up on hover */}
          <motion.div
            className="absolute -bottom-6 -left-6 -right-6 bg-black/80 backdrop-blur-sm rounded-b-2xl px-5 py-4 pointer-events-none"
            initial={{ y: "100%", opacity: 0 }}
            animate={hovering && phase === "revealed" ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-white/80 leading-relaxed">{speaker.bio}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- section header ---------- */
function SectionHeader({ title, gradientClass }: { title: string; gradientClass: string }) {
  return (
    <div className="text-center mb-14">
      <SectionTitle text={title} className={`font-display font-black text-4xl md:text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`} />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
        className={`mx-auto mt-4 h-px w-24 bg-gradient-to-r ${gradientClass} opacity-40`}
      />
    </div>
  );
}

/* ---------- page ---------- */
export default function Speakers() {
  const { lang } = useLanguage();
  const t = translations[lang].speakersPage;
  const [showBox, setShowBox] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const handleBoxDone = useCallback(() => {
    setRevealed(true);
    /* let exit animation play, then unmount */
    setTimeout(() => setShowBox(false), 600);
  }, []);

  return (
    <div className="min-h-screen text-white relative" style={{ background: "hsl(220 20% 6%)" }}>
      {/* glow-pulse keyframe */}
      <style>{`@keyframes glowPulse{0%,100%{opacity:.4}50%{opacity:.8}}`}</style>

      {/* subtle top glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, hsl(355 75% 50% / 0.06) 0%, transparent 60%)" }} />

      {/* GIFT BOX */}
      {showBox && <GiftBoxReveal onDone={handleBoxDone} />}

      {/* PAGE CONTENT — fades in after box */}
      <div className={`transition-opacity duration-700 ${revealed ? "opacity-100" : "opacity-0"}`}>
        <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(355 75% 50% / 0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6"
          >
            <span className="text-white">{t.heroHeading1} </span>
            <span className="text-primary">{t.heroHeading2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-8 flex-wrap">
            {t.stats.map((s: { value: string; label: string }, i: number) => (
              <div key={i} className="text-center">
                <div className="font-display font-black text-3xl text-white">{s.value}</div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div className="mt-16" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-6 h-6 text-white/20 mx-auto" />
        </motion.div>
      </section>

      {/* THE 1% GUESTS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(40 80% 50% / 0.04) 0%, transparent 50%)" }} />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <SectionHeader title={t.eliteTitle} gradientClass="from-yellow-300 via-yellow-400 to-amber-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ONE_PERCENT.map((s, i) => (
              <SpeakerCard key={s.name} speaker={s} index={i} tier="elite" globalDelay={200} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL GUESTS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(190 70% 50% / 0.04) 0%, transparent 50%)" }} />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <SectionHeader title={t.internationalTitle} gradientClass="from-cyan-300 via-cyan-400 to-sky-500" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 rounded-2xl bg-[rgba(10,10,20,0.4)] backdrop-blur-xl ring-1 ring-cyan-500/10"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
              <span className="text-3xl">🌍</span>
            </div>
            <p className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-sky-400">
              Coming Soon
            </p>
            <p className="text-sm text-white/40 mt-2 max-w-md text-center">
              {lang === "fr"
                ? "Nos invités internationaux seront annoncés prochainement. Restez à l'écoute !"
                : "Our international guests will be announced soon. Stay tuned!"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom, hsl(355 75% 50% / 0.04) 0%, transparent 50%)" }} />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <SectionHeader title={t.speakersTitle} gradientClass="from-rose-300 via-primary to-rose-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPEAKERS.map((s, i) => (
              <SpeakerCard key={s.name} speaker={s} index={i} tier="standard" globalDelay={200} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-12 bg-[rgba(10,10,20,0.55)] backdrop-blur-xl ring-1 ring-white/10"
          >
            <h3 className="font-display font-black text-3xl text-white mb-4">{t.ctaHeading}</h3>
            <p className="text-white/55 mb-8">{t.ctaDesc}</p>
            <a href="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95">
              {t.ctaButton}
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoWhite} alt="Maghreb Youth Summit" className="h-8 opacity-70" />
          <p className="text-xs text-white/40">{t.copyright}</p>
          <a href="/" className="text-xs text-white/50 hover:text-white transition-colors">{t.backHome}</a>
        </div>
      </footer>
      </div>
    </div>
  );
}