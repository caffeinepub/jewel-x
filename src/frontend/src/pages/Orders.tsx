import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import BackButton from "../components/BackButton";
import { formatPrice } from "../data/mockData";

const MOCK_ORDERS = [
  {
    id: "JX-2026-001",
    date: "March 10, 2026",
    status: "Delivered",
    items: [
      {
        name: "Aurum Cuff Bracelet",
        qty: 1,
        price: 12500,
        img: "/assets/generated/product-bracelet-1.dim_600x600.jpg",
      },
    ],
    total: 12500,
  },
  {
    id: "JX-2026-002",
    date: "March 15, 2026",
    status: "Shipped",
    items: [
      {
        name: "Pearl Drop Earrings",
        qty: 1,
        price: 7500,
        img: "/assets/generated/product-earrings-1.dim_600x600.jpg",
      },
      {
        name: "Solitaire Diamond Ring",
        qty: 1,
        price: 32000,
        img: "/assets/generated/product-ring-1.dim_600x600.jpg",
      },
    ],
    total: 39500,
  },
  {
    id: "JX-2026-003",
    date: "March 18, 2026",
    status: "Processing",
    items: [
      {
        name: "Empress Pendant Necklace",
        qty: 1,
        price: 18500,
        img: "/assets/generated/product-necklace-1.dim_600x600.jpg",
      },
    ],
    total: 18500,
  },
];

const statusConfig = {
  Delivered: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Delivered",
  },
  Shipped: {
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    label: "Shipped",
  },
  Processing: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    label: "Processing",
  },
  Cancelled: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-red-50",
    label: "Cancelled",
  },
};

export default function Orders() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <BackButton />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">
          My Orders
        </h1>

        {MOCK_ORDERS.length === 0 ? (
          <div className="text-center py-24" data-ocid="orders.empty_state">
            <Package className="w-14 h-14 text-muted-foreground/30 mx-auto mb-5" />
            <h2 className="font-serif text-xl text-muted-foreground mb-3">
              No orders yet
            </h2>
            <Link
              to="/shop"
              className="text-gold hover:underline text-sm"
              data-ocid="orders.shop_now.button"
            >
              Start Shopping <ArrowRight className="inline w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {MOCK_ORDERS.map((order, i) => {
              const cfg =
                statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={order.id}
                  className="bg-card rounded-lg shadow-card overflow-hidden"
                  data-ocid={`orders.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div>
                      <p className="text-[10px] tracking-widest text-muted-foreground">
                        ORDER ID
                      </p>
                      <p className="font-semibold text-sm">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] tracking-widest text-muted-foreground">
                        DATE
                      </p>
                      <p className="text-sm">{order.date}</p>
                    </div>
                    <Badge
                      className={`${cfg.bg} ${cfg.color} border-0 flex items-center gap-1.5 text-xs`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </Badge>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 bg-muted/40 text-sm">
                    <span className="text-muted-foreground">Order Total</span>
                    <span className="font-bold text-gold">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
