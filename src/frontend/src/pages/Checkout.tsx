import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Banknote, CheckCircle2, QrCode, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/mockData";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
];

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "qr" | "cod">(
    "upi",
  );
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = cartTotal > 5000 ? 0 : 250;
  const total = cartTotal + shipping - discount;

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const validateCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "JEWEL10") {
      setDiscount(Math.round(cartTotal * 0.1));
      setCouponMsg("10% discount applied!");
    } else if (code === "FIRST500") {
      setDiscount(500);
      setCouponMsg("₹500 discount applied!");
    } else {
      setDiscount(0);
      setCouponMsg("Invalid coupon code");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = [
      form.name,
      form.phone,
      form.address1,
      form.city,
      form.state,
      form.pincode,
    ];
    if (required.some((v) => !v.trim())) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <main
        className="pt-24 pb-20 min-h-screen flex items-center justify-center"
        data-ocid="checkout.success_state"
      >
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase. Your jewellery will be dispatched
            within 2 business days.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            A confirmation has been sent to your contact details.
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            className="bg-foreground text-primary-foreground text-[11px] tracking-widest h-11 rounded-sm px-8"
            data-ocid="checkout.continue_shopping.button"
          >
            CONTINUE SHOPPING
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">
          Checkout
        </h1>
        <form onSubmit={handlePlaceOrder}>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left */}
            <div className="flex-1 space-y-8">
              {/* Shipping */}
              <section className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-xs tracking-widest">
                      FULL NAME *
                    </Label>
                    <Input
                      id="name"
                      {...field("name")}
                      className="mt-1"
                      data-ocid="checkout.name.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone" className="text-xs tracking-widest">
                      PHONE NUMBER *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...field("phone")}
                      className="mt-1"
                      data-ocid="checkout.phone.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="addr1" className="text-xs tracking-widest">
                      ADDRESS LINE 1 *
                    </Label>
                    <Input
                      id="addr1"
                      {...field("address1")}
                      placeholder="House/Flat No., Street"
                      className="mt-1"
                      data-ocid="checkout.address1.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="addr2" className="text-xs tracking-widest">
                      ADDRESS LINE 2
                    </Label>
                    <Input
                      id="addr2"
                      {...field("address2")}
                      placeholder="Area, Landmark (optional)"
                      className="mt-1"
                      data-ocid="checkout.address2.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-xs tracking-widest">
                      CITY *
                    </Label>
                    <Input
                      id="city"
                      {...field("city")}
                      className="mt-1"
                      data-ocid="checkout.city.input"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="pincode"
                      className="text-xs tracking-widest"
                    >
                      PINCODE *
                    </Label>
                    <Input
                      id="pincode"
                      {...field("pincode")}
                      maxLength={6}
                      className="mt-1"
                      data-ocid="checkout.pincode.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="state" className="text-xs tracking-widest">
                      STATE *
                    </Label>
                    <select
                      id="state"
                      value={form.state}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, state: e.target.value }))
                      }
                      className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      required
                      data-ocid="checkout.state.select"
                    >
                      <option value="">Select State</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    [
                      {
                        value: "upi",
                        icon: Smartphone,
                        label: "UPI / NetBanking",
                      },
                      { value: "qr", icon: QrCode, label: "QR Code" },
                      {
                        value: "cod",
                        icon: Banknote,
                        label: "Cash on Delivery",
                      },
                    ] as const
                  ).map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPaymentMethod(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-sm ${
                        paymentMethod === value
                          ? "border-gold bg-gold/5 text-gold"
                          : "border-border hover:border-gold/40"
                      }`}
                      data-ocid={`checkout.payment.${value}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] tracking-widest font-medium">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
                {paymentMethod === "upi" && (
                  <div className="mt-4">
                    <Label className="text-xs tracking-widest">UPI ID</Label>
                    <Input
                      placeholder="yourname@upi"
                      className="mt-1"
                      data-ocid="checkout.upi.input"
                    />
                  </div>
                )}
                {paymentMethod === "qr" && (
                  <div className="mt-4 flex flex-col items-center gap-3 p-6 bg-muted rounded-lg">
                    <QrCode className="w-20 h-20 text-foreground" />
                    <p className="text-xs text-muted-foreground text-center">
                      Scan this QR code with your UPI app to pay{" "}
                      <strong className="text-gold">
                        {formatPrice(total)}
                      </strong>
                    </p>
                    <p className="text-[10px] tracking-widest text-muted-foreground">
                      jewel.x@upi
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right — Summary */}
            <aside className="lg:w-80 shrink-0">
              <div
                className="bg-card rounded-lg p-6 shadow-card sticky top-28"
                data-ocid="checkout.summary.panel"
              >
                <h2 className="font-serif text-xl font-bold mb-5">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="mb-4" />
                {/* Coupon */}
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponMsg("");
                    }}
                    className="text-xs h-9"
                    data-ocid="checkout.coupon.input"
                  />
                  <Button
                    type="button"
                    onClick={validateCoupon}
                    variant="outline"
                    size="sm"
                    className="text-xs h-9"
                    data-ocid="checkout.coupon.submit_button"
                  >
                    APPLY
                  </Button>
                </div>
                {couponMsg && (
                  <p
                    className={`text-xs mb-3 ${discount > 0 ? "text-green-600" : "text-destructive"}`}
                    data-ocid="checkout.coupon.success_state"
                  >
                    {couponMsg}
                  </p>
                )}
                <div className="space-y-2 text-sm">
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
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-600">
                        −{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-base mb-6">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
                <Button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full bg-gold hover:bg-gold/90 text-white text-[11px] tracking-widest h-12 rounded-sm"
                  data-ocid="checkout.place_order.submit_button"
                >
                  {loading ? "PLACING ORDER..." : "PLACE ORDER"}
                </Button>
                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  🔒 Secure & Encrypted Checkout
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
