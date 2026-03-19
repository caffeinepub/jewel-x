import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: { children: React.ReactNode }) {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;
      // Scroll to top instantly
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      // Trigger re-animation
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className="pt-16 md:pt-20"
      style={{
        animation: visible
          ? "pageSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both"
          : "none",
      }}
    >
      <style>{`
        @keyframes pageSlideIn {
          from {
            opacity: 0;
            transform: translateY(-28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {children}
    </div>
  );
}
