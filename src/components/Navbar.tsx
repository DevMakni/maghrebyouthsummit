import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Venue", href: "#venue" },
  { label: "Register", href: "#register" },
];



const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (!isHome) {
        navigate("/" + href);
      }
    }
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

        </div>

        <a
          href={isHome ? "#register" : "/#register"}
          className="hidden md:inline-flex bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Register Now
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

          <a
            href={isHome ? "#register" : "/#register"}
            onClick={() => setMobileOpen(false)}
            className="block bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm text-center"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
