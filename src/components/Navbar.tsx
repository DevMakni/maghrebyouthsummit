import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage, Lang } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const t = translations[lang].navbar;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const navLinks = [
    { label: t.about,    href: "#about" },
    { label: t.program,  href: "#program" },
    { label: t.venue,    href: "#venue" },
    { label: t.register, href: "#register" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (!isHome) navigate("/" + href);
    }
  };

  const switchLang = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logoWhite} alt="Maghreb Youth Summit" className="h-14" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-full px-3 py-1.5 transition-all duration-200"
            >
              {lang === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
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
          href={isHome ? "#register" : "/#register"}
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              onClick={() => handleNavClick(link.href)}
              className="block text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

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
            href={isHome ? "#register" : "/#register"}
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
