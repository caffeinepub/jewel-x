import { Link } from "@tanstack/react-router";
import { Eye, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { type MockProduct, formatPrice } from "../data/mockData";
import StarRating from "./StarRating";

interface Props {
  product: MockProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const wished = isInWishlist(product.id);

  return (
    <div
      className="product-card group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      data-ocid={`product.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="product-card-img w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gold text-white text-[9px] tracking-widest px-2 py-0.5 rounded-sm font-medium">
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid={`product.wishlist.toggle.${index + 1}`}
        >
          <Heart
            className={`w-4 h-4 ${wished ? "fill-gold text-gold" : "text-foreground"}`}
          />
        </button>
        {/* Hover overlay */}
        <div className="product-card-overlay absolute inset-0 bg-foreground/60 flex flex-col items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full bg-gold hover:bg-gold/90 text-white text-[10px] tracking-[0.15em] font-medium py-2.5 rounded-sm transition-colors"
            data-ocid={`product.add_to_cart.${index + 1}`}
          >
            ADD TO CART
          </button>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="w-full bg-white/10 border border-white/30 text-white text-[10px] tracking-[0.15em] font-medium py-2.5 rounded-sm text-center flex items-center justify-center gap-1.5 hover:bg-white/20 transition-colors"
            data-ocid={`product.view.${index + 1}`}
          >
            <Eye className="w-3.5 h-3.5" /> VIEW DETAILS
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-1">
          {product.category.toUpperCase()}
        </p>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-serif text-base font-semibold text-foreground hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5 mb-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-sans text-base font-semibold text-gold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
