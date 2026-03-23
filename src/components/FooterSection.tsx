import logoWhite from "@/assets/logo-white.png";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const FooterSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  return (
  <footer className="relative py-16">
    <div className="absolute inset-0 section-overlay-strong" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <img src={logoWhite} alt="Maghreb Youth Summit" className="h-8 mb-4 opacity-90" />
          <p className="text-sm text-white/50 leading-relaxed">
            {t.description.split('\n').map((line, i) => (<span key={i}>{line}{i === 0 && <br />}</span>))}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-bold text-white mb-4">{t.contact}</h4>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
            +216 55 080 321 
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
            info@maghrebyouthsummit.com
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
            sponsorship@maghrebyouthsummit.com
          </div>
          <div className="flex items-start gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
            Route de la Marsa, Centre Millenium 2eme etage, B 32, Sidi Daoued
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-bold text-white mb-4">{t.quickLinks}</h4>
          {t.links.map((link, i) => (
            <a
              key={link}
              href={`#${["about", "program", "venue", "register"][i]}`}
              className="block text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          {t.copyright}
        </p>
        <div className="flex items-center gap-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/maghreb_youth_summit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full card-glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@maghreb.youth_summit?_r=1&_t=ZS-94li7x2DhY7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full card-glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default FooterSection;
