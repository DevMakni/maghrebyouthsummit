import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import logoWhite from "@/assets/logo-white.png";
import cardBg from "@/assets/HOME2.png";

interface InvitationCardProps {
  name: string;
  track?: string;
  onClose: () => void;
}

const InvitationCard = ({ name, track = "Young Leader", onClose }: InvitationCardProps) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* â”€â”€ Escape key â”€â”€ */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* â”€â”€ Generate canvas blob â”€â”€ */
  const generateBlob = async (format: "post" | "story"): Promise<{ blob: Blob; dataUrl: string }> => {
    const card = document.getElementById("invitation-card");
    if (!card) throw new Error("Card not found");

    const canvas = await html2canvas(card, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const configs = {
      post:  { w: 1080, h: 1080 },
      story: { w: 1080, h: 1920 },
    };
    const { w, h } = configs[format];
    const output = document.createElement("canvas");
    output.width  = w;
    output.height = h;
    const ctx = output.getContext("2d")!;

    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, w, h);

    const scale = Math.min(w / canvas.width, h / canvas.height) * (format === "story" ? 0.75 : 0.9);
    const x = (w - canvas.width  * scale) / 2;
    const y = (h - canvas.height * scale) / 2;
    ctx.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "500 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("maghrebyouthsummit.com", w / 2, h - 30);

    const dataUrl = output.toDataURL("image/png", 1.0);
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return { blob, dataUrl };
  };

  /* â”€â”€ Download â”€â”€ */
  const downloadCard = async (format: "post" | "story") => {
    setIsDownloading(true);
    try {
      const { dataUrl } = await generateBlob(format);
      const link = document.createElement("a");
      link.download = `MYS2026-invitation-${format}-${name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  /* â”€â”€ Share to feed / story â”€â”€ */
  const shareCard = async (format: "post" | "story") => {
    setIsSharing(true);
    try {
      const { blob } = await generateBlob(format);
      const file = new File([blob], `MYS2026-invitation-${format}.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Maghreb Youth Summit 2026",
          text: "I'm officially invited to the Maghreb Youth Summit 2026 ðŸŽ‰",
        });
      } else {
        /* fallback: download if share API not available */
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `MYS2026-invitation-${format}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const nameFontSize = name.length > 20 ? "18px" : name.length > 14 ? "22px" : "27px";
  const busy = isDownloading || isSharing;

  return (
    <AnimatePresence>
      {/* â”€â”€ Backdrop â”€â”€ */}
      <motion.div
        key="invitation-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* â”€â”€ Inner container (stops propagation so clicking card doesn't close) â”€â”€ */}
        <motion.div
          key="invitation-container"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-8 w-full max-w-md py-8"
        >
          {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
              THE ACTUAL CARD (captured by html2canvas)
              â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          <div
            id="invitation-card"
            ref={cardRef}
            style={{
              width: "380px",
              height: "500px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              flexShrink: 0,
              boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* Background image */}
            <img
              src={cardBg}
              alt=""
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            {/* Dark overlay â€” top fade for logo readability */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(5,10,24,0.82) 0%, rgba(5,10,24,0.35) 38%, rgba(5,10,24,0.55) 62%, rgba(5,10,24,0.92) 100%)",
            }} />

            {/* Subtle teal vignette */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 110%, rgba(223,32,48,0.18) 0%, transparent 65%)",
            }} />

            {/* Corner bracket â€” top-left */}
            <div style={{ position: "absolute", top: 18, left: 18, width: 20, height: 20, borderTop: "1.5px solid rgba(223,32,48,0.6)", borderLeft: "1.5px solid rgba(223,32,48,0.6)" }} />
            {/* Corner bracket â€” top-right */}
            <div style={{ position: "absolute", top: 18, right: 18, width: 20, height: 20, borderTop: "1.5px solid rgba(223,32,48,0.6)", borderRight: "1.5px solid rgba(223,32,48,0.6)" }} />
            {/* Corner bracket â€” bottom-left */}
            <div style={{ position: "absolute", bottom: 18, left: 18, width: 20, height: 20, borderBottom: "1.5px solid rgba(223,32,48,0.6)", borderLeft: "1.5px solid rgba(223,32,48,0.6)" }} />
            {/* Corner bracket â€” bottom-right */}
            <div style={{ position: "absolute", bottom: 18, right: 18, width: 20, height: 20, borderBottom: "1.5px solid rgba(223,32,48,0.6)", borderRight: "1.5px solid rgba(223,32,48,0.6)" }} />

            {/* â”€â”€ LOGO top â”€â”€ */}
            <div style={{ position: "absolute", top: 30, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <img
                src={logoWhite}
                alt="Maghreb Youth Summit"
                crossOrigin="anonymous"
                style={{ height: "52px", objectFit: "contain" }}
              />
            </div>

            {/* â”€â”€ CENTER CONTENT â”€â”€ */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 40px 72px",
              gap: 0,
            }}>
              {/* INVITED pill */}
              <div style={{
                fontSize: "7.5px",
                letterSpacing: "0.22em",
                fontWeight: 700,
                color: "#DF2030",
                border: "1px solid rgba(223,32,48,0.4)",
                borderRadius: "30px",
                padding: "5px 16px",
                marginBottom: "18px",
                textTransform: "uppercase" as const,
                backdropFilter: "blur(4px)",
                background: "rgba(223,32,48,0.06)",
              }}>
                You're Officially Invited
              </div>

              {/* Italic message */}
              <div style={{
                fontSize: "10.5px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.85,
                textAlign: "center",
                marginBottom: "22px",
                fontStyle: "italic",
                letterSpacing: "0.01em",
              }}>
                It is with great honor that we invite you to join<br />
                the most ambitious gathering of young leaders<br />
                North Africa has ever seen.
              </div>

              {/* Divider */}
              <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, #DF2030, transparent)", marginBottom: "18px" }} />

              {/* Name */}
              <div style={{
                fontSize: nameFontSize,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                textAlign: "center",
                marginBottom: "8px",
                wordBreak: "break-word" as const,
                textShadow: "0 2px 24px rgba(223,32,48,0.35)",
                textTransform: "uppercase" as const,
              }}>
                {name}
              </div>

              {/* Track */}
              <div style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                textTransform: "uppercase" as const,
                textAlign: "center",
                marginBottom: "20px",
              }}>
                {track}
              </div>

              {/* Divider */}
              <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, #DF2030, transparent)", marginBottom: "18px" }} />

              {/* Closing */}
              <div style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.9,
                textAlign: "center",
                letterSpacing: "0.03em",
              }}>
                Your seat is reserved.
                <br />
                <span style={{ color: "#DF2030", fontWeight: 700, letterSpacing: "0.05em" }}>YOUR IMPACT STARTS NOW.</span>
              </div>
            </div>

            {/* â”€â”€ BOTTOM ROW â”€â”€ */}
            <div style={{
              position: "absolute",
              bottom: 28,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}>
              {["2026", "Â·", "MONASTIR", "Â·", "TUNISIA"].map((item, i) => (
                <span key={i} style={{ fontSize: "7.5px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
                  {item}
                </span>
              ))}
            </div>

            {/* Bottom teal line */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #DF2030 25%, #DF2030 75%, transparent)" }} />
          </div>

          {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
              CONTROLS (not captured by html2canvas)
              â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          <motion.div
            key="invitation-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="w-full flex flex-col items-center gap-4 text-center"
          >
            <div>
              <p className="text-white/55 text-sm">Share it directly or download to your device</p>
            </div>

            {/* Share row */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => shareCard("post")}
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary/90 ring-1 ring-primary/40 rounded-full px-4 py-3 text-sm font-bold text-white hover:bg-primary hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Share icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share to Feed
              </button>
              <button
                onClick={() => shareCard("story")}
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 ring-1 ring-white/20 rounded-full px-4 py-3 text-sm font-bold text-white hover:bg-white/15 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Phone portrait icon */}
                <svg width="13" height="15" viewBox="0 0 13 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="1" width="11" height="18" rx="2"/>
                  <circle cx="6.5" cy="16.5" r="0.8" fill="currentColor" stroke="none"/>
                </svg>
                Share Story
              </button>
            </div>

            {/* Download row */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => downloadCard("post")}
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/8 ring-1 ring-white/15 rounded-full px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/12 hover:text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {busy ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                )}
                Post (1:1)
              </button>
              <button
                onClick={() => downloadCard("story")}
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/8 ring-1 ring-white/15 rounded-full px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/12 hover:text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Story (9:16)
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="text-white/35 hover:text-white text-sm transition-colors cursor-pointer mt-1"
            >
              Close and continue â†’
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvitationCard;
