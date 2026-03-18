import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const { cartCount, wishlist } = useApp();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "BRIDAL", href: "/shop" },
    { label: "SHOP", href: "/shop" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const collectionLinks = [
    { label: "Bracelets", href: "/shop?category=bracelets" },
    { label: "Necklaces", href: "/shop?category=necklaces" },
    { label: "Rings", href: "/shop?category=rings" },
    { label: "Earrings", href: "/shop?category=earrings" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F3EA]/95 backdrop-blur-md shadow-card"
          : "bg-[#F8F3EA]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-ocid="nav.link">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-foreground">
              JEWEL <span className="text-gold">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {/* Collections dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors"
                aria-expanded={collectionsOpen}
                aria-haspopup="true"
                data-ocid="nav.collections.toggle"
              >
                COLLECTIONS <ChevronDown className="w-3 h-3" />
              </button>
              {collectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-card border border-border rounded-md shadow-card-hover py-2 z-50">
                  {collectionLinks.map((l) => (
                    <Link
                      key={l.label}
                      to="/shop"
                      className="block px-4 py-2 text-xs tracking-widest hover:text-gold hover:bg-muted transition-colors"
                      data-ocid="nav.collection.link"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to="/shop"
                className="text-xs tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors"
                data-ocid="nav.link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              className="p-1.5 hover:text-gold transition-colors"
              aria-label="Search"
              data-ocid="nav.search_input"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/login"
              className="p-1.5 hover:text-gold transition-colors"
              aria-label="Account"
              data-ocid="nav.user.link"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              to="/wishlist"
              className="p-1.5 hover:text-gold transition-colors relative"
              aria-label="Wishlist"
              data-ocid="nav.wishlist.link"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-1.5 hover:text-gold transition-colors relative"
              aria-label="Cart"
              data-ocid="nav.cart.link"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="md:hidden p-1.5"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F8F3EA] border-t border-border px-6 py-6 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              COLLECTIONS
            </p>
            {collectionLinks.map((l) => (
              <Link
                key={l.label}
                to="/shop"
                className="block py-2 text-sm font-medium hover:text-gold"
                data-ocid="nav.mobile.collection.link"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to="/shop"
                className="block py-2 text-sm font-medium tracking-widest hover:text-gold"
                data-ocid="nav.mobile.link"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
