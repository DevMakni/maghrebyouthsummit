import { motion } from "framer-motion";
import { Download, Mail, Phone, UserSearch, Eye, Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoWhite from "@/assets/logo-white.png";

/* ── Why Partner ── */
const reasons = [
  { icon: UserSearch, title: "Access to Talent", desc: "Connect with 2000+ ambitious young minds from across the Maghreb." },
  { icon: Eye, title: "Brand Visibility", desc: "Premium exposure to a highly engaged Gen-Z and Millennial audience with 5M+ social reach." },
  { icon: Sparkles, title: "Innovation Exposure", desc: "Position your brand at the forefront of emerging technologies and ideas." },
  { icon: HeartHandshake, title: "Social Impact", desc: "Demonstrate genuine commitment to youth empowerment and regional development." },
];

/* ── Tiers ── */
const tiers = [
  {
    name: "Platinum",
    color: "from-white/20 to-white/5",
    ring: "ring-white/30",
    badge: "bg-white/10 text-white",
    perks: [
      "Logo on all event materials & stage",
      "Dedicated booth (Premium location)",
      "Speaking slot at main stage",
      "VIP access for 10 representatives",
      "Full branding on livestream",
      "Post-event report & media kit",
      "4 recruitment panels",
      "Exclusive social media campaign",
    ],
  },
  {
    name: "Gold",
    color: "from-yellow-400/20 to-yellow-400/5",
    ring: "ring-yellow-400/30",
    badge: "bg-yellow-400/15 text-yellow-300",
    perks: [
      "Logo on event materials & stage",
      "Standard booth",
      "Panel speaking opportunity",
      "VIP access for 6 representatives",
      "Branding on livestream",
      "Post-event report",
      "2 recruitment panels",
      "Social media mentions",
    ],
  },
  {
    name: "Silver",
    color: "from-slate-300/20 to-slate-300/5",
    ring: "ring-slate-300/30",
    badge: "bg-slate-300/15 text-slate-300",
    perks: [
      "Logo on event materials",
      "Shared booth space",
      "VIP access for 4 representatives",
      "On-site brand visibility",
      "Post-event digital mention",
      "1 recruitment panel",
    ],
  },
  {
    name: "Bronze",
    color: "from-orange-400/20 to-orange-400/5",
    ring: "ring-orange-400/30",
    badge: "bg-orange-400/15 text-orange-300",
    perks: [
      "Logo on event program booklet",
      "VIP access for 2 representatives",
      "On-site brand mention",
      "Post-event digital mention",
    ],
  },
];

const stats = [
  { value: "2000+", label: "Attendees" },
  { value: "5M+", label: "Social Reach" },
  { value: "4", label: "Program Tracks" },
  { value: "40+", label: "Companies" },
  { value: "30+", label: "Speakers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.2, 0, 0, 1] },
  }),
};

const Partnership = () => (
  <div className="min-h-screen text-white">
    <Navbar />

    {/* ── HERO ── */}
    <section className="relative min-h-[70vh] flex items-center justify-center text-center pt-28 pb-20">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.12)_0%,transparent_65%)]" />
      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 ring-1 ring-primary/25 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase text-primary mb-8"
        >
          Partnership Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6 text-glow-white"
        >
          Partner With the <br />
          <span className="text-primary text-glow">Next Generation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          The Maghreb Youth Summit 2026 is your gateway to 2000+ future leaders, entrepreneurs, and innovators from across North Africa. Shape the next generation while amplifying your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Dossier download — replace href with real PDF path once file is added */}
          <a
            href="/partner-dossier.pdf"
            download
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download Partner Dossier
          </a>
          <a
            href="mailto:sponsorship@maghrebyouthsummit.com"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section className="relative py-14">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-8 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
             
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg">{s.value}</div>
              <div className="text-sm text-white/55 mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY PARTNER ── */}
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
        >
          Why Partner With Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 text-center max-w-xl mx-auto mb-14"
        >
          Align your brand with Tunisia's most impactful youth event and gain unparalleled access to talent and visibility.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              custom={i}
             
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-glass rounded-2xl p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                <r.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{r.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TIERS ── */}
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay-strong" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white text-center mb-4"
        >
          Partnership Packages
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 text-center max-w-xl mx-auto mb-16"
        >
          Choose the package that best fits your goals. Custom packages are also available — contact us to discuss.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              custom={i}
             
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative card-glass rounded-2xl p-7 ring-1 ${tier.ring} overflow-hidden group`}
            >
              {/* gradient top glow */}
              <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${tier.color} pointer-events-none`} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="relative z-10">
                <span className={`inline-block text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-4 ${tier.badge}`}>
                  {tier.name}
                </span>
                <ul className="space-y-2.5 mt-2">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/40 text-sm mt-10"
        >
          All packages include certificate of partnership & post-event analytics report.
          Custom packages available on request.
        </motion.p>
      </div>
    </section>

    {/* ── DOWNLOAD + CONTACT CTA ── */}
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(355_75%_50%/0.08)_0%,transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mb-4"
        >
          Ready to Partner?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 mb-10 text-lg"
        >
          Download our full partnership dossier or reach out directly — our team will get back to you within 48 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="/partner-dossier.pdf"
            download
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download Dossier
          </a>
          <a
            href="mailto:sponsorship@maghrebyouthsummit.com"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <Mail className="w-5 h-5" />
            sponsorship@maghrebyouthsummit.com
          </a>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/50">
          <a href="tel:+21652053438" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
            +216 52 053 438
          </a>
          <a href="tel:+21658410458" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
            +216 58 410 458
          </a>
        </div>
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

export default Partnership;
