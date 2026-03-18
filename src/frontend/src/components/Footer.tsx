import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-footer text-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold tracking-widest text-[#D8D1C6]">
                JEWEL <span className="text-gold">X</span>
              </span>
            </Link>
            <p className="text-sm text-[#8A8278] leading-relaxed mb-6">
              Crafting heirloom-quality jewellery that celebrates the beauty of
              Indian artisanship and contemporary elegance.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8278] hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8278] hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8278] hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8278] hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-[#D8D1C6] mb-5">
              SHOP
            </h4>
            <ul className="space-y-3">
              {[
                "Bracelets",
                "Necklaces",
                "Rings",
                "Earrings",
                "Bridal Collection",
                "New Arrivals",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-[#8A8278] hover:text-gold transition-colors"
                    data-ocid="footer.shop.link"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-[#D8D1C6] mb-5">
              HELP
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Order Tracking", href: "/orders" },
                { label: "Shipping Policy", href: "/contact" },
                { label: "Returns & Exchanges", href: "/contact" },
                { label: "Care Guide", href: "/about" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-[#8A8278] hover:text-gold transition-colors"
                    data-ocid="footer.help.link"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-[#D8D1C6] mb-5">
              STAY IN THE KNOW
            </h4>
            <p className="text-sm text-[#8A8278] mb-4">
              Subscribe for new arrivals, exclusive offers, and jewellery care
              tips.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-[#D8D1C6] placeholder:text-[#8A8278] text-sm h-9 flex-1"
                data-ocid="footer.newsletter.input"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-gold hover:bg-gold/90 text-white text-[10px] tracking-widest h-9 px-3"
                data-ocid="footer.newsletter.submit_button"
              >
                JOIN
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8A8278]">
            © {year} JEWEL X. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
