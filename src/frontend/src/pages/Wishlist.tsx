import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import BackButton from "../components/BackButton";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

export default function Wishlist() {
  const { wishlist } = useApp();

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">
          My Wishlist
        </h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-24" data-ocid="wishlist.empty_state">
            <Heart className="w-14 h-14 text-muted-foreground/30 mx-auto mb-5" />
            <h2 className="font-serif text-xl text-muted-foreground mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Save pieces you love and revisit them anytime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-3 text-[11px] tracking-widest rounded-full"
              data-ocid="wishlist.shop_now.button"
            >
              EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
