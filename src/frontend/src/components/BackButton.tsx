import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      aria-label="Go back"
      data-ocid="nav.back_button"
      className="fixed top-20 left-4 z-40 w-10 h-10 rounded-full bg-transparent border border-gold/50 text-gold shadow-lg flex items-center justify-center hover:bg-gold/20 hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
