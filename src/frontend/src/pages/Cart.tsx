import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/mockData";

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const shipping = cartTotal > 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">
          Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24" data-ocid="cart.empty_state">
            <ShoppingBag className="w-14 h-14 text-muted-foreground/30 mx-auto mb-5" />
            <h2 className="font-serif text-2xl text-muted-foreground mb-3">
              Your bag is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Discover our exquisite collections and find your perfect piece.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-3 text-[11px] tracking-widest rounded-full"
              data-ocid="cart.shop_now.button"
            >
              SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Items */}
            <div className="flex-1 space-y-5" data-ocid="cart.list">
              {cart.map((item, i) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-card rounded-lg p-4 shadow-card"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <Link
                    to="/product/$id"
                    params={{ id: item.product.id }}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">
                      {item.product.category.toUpperCase()}
                    </p>
                    <Link to="/product/$id" params={{ id: item.product.id }}>
                      <h3 className="font-serif text-base font-semibold hover:text-gold transition-colors truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gold font-semibold mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                          data-ocid={`cart.qty.decrease.${i + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                          data-ocid={`cart.qty.increase.${i + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove"
                        data-ocid={`cart.remove.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-semibold text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="lg:w-80 shrink-0">
              <div
                className="bg-card rounded-lg p-6 shadow-card sticky top-28"
                data-ocid="cart.summary.panel"
              >
                <h2 className="font-serif text-xl font-bold mb-5">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add {formatPrice(5000 - cartTotal)} more for free shipping
                    </p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold text-base mb-6">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
                <Link to="/checkout">
                  <Button
                    className="w-full bg-foreground text-primary-foreground hover:bg-foreground/90 text-[11px] tracking-widest h-12 rounded-sm"
                    data-ocid="cart.checkout.button"
                  >
                    PROCEED TO CHECKOUT{" "}
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </Link>
                <Link
                  to="/shop"
                  className="block text-center mt-3 text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
