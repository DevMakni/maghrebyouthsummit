import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage, Lang } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const ComingSoonBadge = ({ label }: { label: string }) => (
  <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-full">
    {label}
  </span>
);

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const t = translations[lang].navbar;

  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [aproposOpen, setAproposOpen] = useState(false);
  const [mobileAproposOpen, setMobileAproposOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const [langOpen, setLangOpen]       = useState(false);

  const aproposRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);
  const langRef    = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();
  const location   = useLocation();
  const isHome     = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (aproposRef.current && !aproposRef.current.contains(e.target as Node)) setAproposOpen(false);
      if (programRef.current && !programRef.current.contains(e.target as Node)) setProgramOpen(false);
      if (langRef.current    && !langRef.current.contains(e.target as Node))    setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setAproposOpen(false);
    if (href.startsWith("#")) {
      if (!isHome) navigate("/" + href);
      else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const goTo = (href: string) => {
    setMobileOpen(false);
    setProgramOpen(false);
    setMobileProgramOpen(false);
    navigate(href);
  };

  const switchLang = (l: Lang) => { setLang(l); setLangOpen(false); };

  const placeholderClass =
    "flex items-center gap-1 text-sm font-medium text-white/35 cursor-default select-none";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src={logoWhite} alt="Maghreb Youth Summit" className="h-14" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">

          {/* A Propos dropdown */}
          <div ref={aproposRef} className="relative">
            <button
              onMouseEnter={() => setAproposOpen(true)}
              onClick={() => setAproposOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {t.aPropos}
              <ChevronIcon open={aproposOpen} />
            </button>

            {aproposOpen && (
              <div
                onMouseLeave={() => setAproposOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="p-2 space-y-0.5">
                  {t.aProposItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollTo(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Program dropdown */}
          <div ref={programRef} className="relative">
            <button
              onMouseEnter={() => setProgramOpen(true)}
              onClick={() => setProgramOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {t.programme}
              <ChevronIcon open={programOpen} />
            </button>

            {programOpen && (
              <div
                onMouseLeave={() => setProgramOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="p-2">
                  {/* University */}
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 pt-2 pb-1">
                    {t.programItems.universityLabel}
                  </p>
                  {t.programItems.university.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => goTo(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                  {/* High School */}
                  <div className="my-1 border-t border-white/10" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 pt-1 pb-1">
                    {t.programItems.highschoolLabel}
                  </p>
                  {t.programItems.highschool.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => goTo(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => { navigate("/speakers"); }}
            className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
          >
            {t.speakers}
          </button>
          <span className={placeholderClass}>
            {t.exposant}<ComingSoonBadge label={t.comingSoon} />
          </span>

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-full px-3 py-1.5 transition-all duration-200"
            >
              {lang === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
              <ChevronIcon open={langOpen} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="p-1.5 space-y-0.5">
                  {(["en", "fr"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLang(l)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        lang === l
                          ? "bg-primary/20 text-primary"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {l === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <a
          href="/register"
          className="hidden md:inline-flex bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95"
        >
          {t.registerNow}
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-3">

          {/* A Propos accordion */}
          <div>
            <button
              onClick={() => setMobileAproposOpen((o) => !o)}
              className="flex items-center justify-between w-full text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {t.aPropos}
              <ChevronIcon open={mobileAproposOpen} />
            </button>
            {mobileAproposOpen && (
              <div className="mt-2 ml-3 space-y-1 border-l border-white/10 pl-4">
                {t.aProposItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => { setMobileAproposOpen(false); scrollTo(item.href); }}
                    className="block w-full text-left text-sm text-white/60 hover:text-white transition-colors py-1"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program accordion (mobile) */}
          <div>
            <button
              onClick={() => setMobileProgramOpen((o) => !o)}
              className="flex items-center justify-between w-full text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {t.programme}
              <ChevronIcon open={mobileProgramOpen} />
            </button>
            {mobileProgramOpen && (
              <div className="mt-2 ml-3 space-y-1 border-l border-white/10 pl-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 pt-1 pb-0.5">{t.programItems.universityLabel}</p>
                {t.programItems.university.map((item) => (
                  <button key={item.href} onClick={() => goTo(item.href)}
                    className="block w-full text-left text-sm text-white/60 hover:text-white transition-colors py-1">
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-white/10 my-1" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 pb-0.5">{t.programItems.highschoolLabel}</p>
                {t.programItems.highschool.map((item) => (
                  <button key={item.href} onClick={() => goTo(item.href)}
                    className="block w-full text-left text-sm text-white/60 hover:text-white transition-colors py-1">
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => { navigate("/speakers"); setMobileOpen(false); }}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            {t.speakers}
          </button>
          <div className="flex items-center gap-2 text-sm text-white/30">
            {t.exposant}<ComingSoonBadge label={t.comingSoon} />
          </div>

          {/* Mobile language switcher */}
          <div className="flex items-center gap-2 pt-1">
            {(["en", "fr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false); }}
                className={`flex-1 text-center text-sm font-bold py-1.5 rounded-lg transition-all duration-150 ${
                  lang === l
                    ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                    : "text-white/60 hover:text-white bg-white/5 ring-1 ring-white/10"
                }`}
              >
                {l === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
              </button>
            ))}
          </div>

          <a
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="block bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm text-center"
          >
            {t.registerNow} 
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
