import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { RUDRAKSHA_PRODUCTS } from "../data/rudrakshaProducts";

const MUKHI_TYPES = [
  {
    name: "0 Mukhi (Nirakar)",
    deity: "Formless Divine",
    benefit: "Deep meditation & inner awakening",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "1 Mukhi",
    deity: "Lord Shiva",
    benefit: "Rarest & most powerful. Supports deep spiritual growth",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "3 Mukhi",
    deity: "Lord Agni",
    benefit: "Clears past karma, boosts confidence and creativity",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "4 Mukhi",
    deity: "Lord Brahma",
    benefit: "Improves knowledge, wisdom, memory",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "5 Mukhi",
    deity: "Lord Shiva",
    benefit: "Keeps mind calm, body healthy. Most recommended",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "6 Mukhi",
    deity: "Lord Kartikeya",
    benefit: "Boosts willpower, courage, removes hurdles",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "7 Mukhi",
    deity: "Goddess Lakshmi",
    benefit: "Brings wealth, success, financial protection",
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "8 Mukhi",
    deity: "Lord Ganesha",
    benefit: "Removes problems, success in new beginnings",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "9 Mukhi",
    deity: "Goddess Durga",
    benefit: "Strength, protection, reduces fear and anxiety",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "10 Mukhi",
    deity: "Lord Vishnu",
    benefit: "Protects from bad energies, family harmony",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "11 Mukhi",
    deity: "Eleven Rudras",
    benefit: "Spiritual energy, deeper meditation",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "12 Mukhi",
    deity: "Lord Surya",
    benefit: "Confidence, leadership, decision-making",
    color: "bg-amber-100 text-amber-800",
  },
  {
    name: "13 Mukhi",
    deity: "Lord Indra",
    benefit: "Wealth, comfort, high status, personal charm",
    color: "bg-lime-100 text-lime-700",
  },
  {
    name: "Gauri Shankar",
    deity: "Shiva & Parvati",
    benefit: "Love, trust, harmony in relationships",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Ganesh Mukhi",
    deity: "Lord Ganesha",
    benefit: "Removes obstacles, success in new phases",
    color: "bg-orange-100 text-orange-800",
  },
];

const TESTIMONIALS = [
  {
    name: "Shrishti Sharma",
    location: "Delhi",
    text: "I've been wearing the 7 Mukhi Rudraksha bracelet for a month, and I feel a positive shift in my life. Finances are improving and I feel more grounded. JEWEL X's quality is truly authentic!",
    img: "//astrotalk.store/cdn/shop/files/image_2.webp?v=1749194530&width=375",
  },
  {
    name: "Pooja Sinha",
    location: "Bengaluru",
    text: "JEWEL X's Rudraksha came energized and ready to wear. The lab certificate gave me full confidence. Beautiful packaging and fast delivery. Highly recommend!",
    img: "//astrotalk.store/cdn/shop/files/WhatsApp_Image_2025-06-03_at_6.37.08_PM_d8969d3f-185d-4b53-9519-9faf0fd68fc0.webp?v=1749194397&width=375",
  },
  {
    name: "Ankita Mehra",
    location: "Gurgaon",
    text: "As a working professional, I needed something to help with mental focus and stress. The 5 Mukhi bracelet has been a game-changer. JEWEL X is my go-to for genuine spiritual products.",
    img: "//astrotalk.store/cdn/shop/files/WhatsApp_Image_2025-06-03_at_6.36.57_PM_1_cb78c79f-8129-4130-8cd8-cd858ddb79a5.webp?v=1749194425&width=375",
  },
  {
    name: "Rajeev Chopra",
    location: "Delhi",
    text: "Running a business comes with stress and sleepless nights. Since wearing my Rudraksha from JEWEL X, I feel calmer and more decisive. The quality is exceptional and delivery was fast.",
    img: "//astrotalk.store/cdn/shop/files/WhatsApp_Image_2025-06-03_at_6.36.57_PM_de205be8-ce17-4f67-b7dc-06c495eca854.webp?v=1749194425&width=375",
  },
];

const FAQS = [
  {
    q: "What is Rudraksha?",
    a: "Rudraksha is a sacred seed from the Elaeocarpus ganitrus tree, found in the Himalayan region. It is said to be born from the tears of Lord Shiva and holds immense spiritual significance in Hinduism. Each bead has natural lines called 'mukhis' (faces), ranging from 1 to 21, each with unique benefits.",
  },
  {
    q: "Can girls wear Rudraksha?",
    a: "Yes, absolutely! Rudraksha is not gender-specific. Both men and women can wear Rudraksha. It provides spiritual benefits, calms the mind, and protects the wearer irrespective of gender.",
  },
  {
    q: "How to wear Rudraksha for the first time?",
    a: "On a Monday morning, take a bath and wear clean clothes. Sit facing East or North. Hold the Rudraksha in your right hand and chant 'Om Namah Shivaya' 11 times. Then wear it around your neck or wrist. It is best worn on auspicious days like Mondays or Maha Shivratri.",
  },
  {
    q: "Can we eat non-veg after wearing Rudraksha?",
    a: "Traditionally, it is advised to avoid non-vegetarian food, alcohol, and impure substances while wearing Rudraksha to maintain its sanctity and positive energy. However, if it is difficult, remove it before consuming and put it back after cleansing yourself.",
  },
  {
    q: "How to identify a real Rudraksha?",
    a: "Genuine Rudraksha has clearly visible natural lines (mukhis) on the surface. It sinks in water (in most cases) and floats between copper coins when placed in a glass of water. JEWEL X provides lab-certified Rudraksha with a certificate of authenticity for every purchase.",
  },
  {
    q: "How to clean Rudraksha?",
    a: "Gently clean your Rudraksha with a soft brush dipped in lukewarm water. Pat dry and apply a few drops of sesame oil to keep it moisturized. Avoid chemical soaps or perfumes. Cleanse it periodically to maintain its energy and luster.",
  },
  {
    q: "Which Rudraksha is best for wealth?",
    a: "The 7 Mukhi Rudraksha, ruled by Goddess Lakshmi, is best for wealth and financial prosperity. The Gauri Shankar Rudraksha is excellent for harmony and abundance. For business success, 8 Mukhi (Lord Ganesha) removes obstacles. Our experts can help you choose the right one based on your birth chart.",
  },
];

function RudrakshProductCard({
  product,
  index,
}: { product: (typeof RUDRAKSHA_PRODUCTS)[number]; index: number }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  return (
    <ScrollReveal delay={index * 50}>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-amber-100"
        data-ocid={`rudraksha.item.${index + 1}`}
      >
        <div className="relative aspect-square overflow-hidden">
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
              {product.badge}
            </span>
          )}
          <span className="absolute top-2 right-2 z-10 bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1 min-h-[2.5rem]">
            {product.name}
          </p>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">
              {product.reviews.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-gray-900 text-sm">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-gray-400 text-xs line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full bg-amber-700 text-white text-[10px] font-semibold py-2 rounded tracking-wider hover:bg-amber-600 transition-colors"
            data-ocid={`rudraksha.add_button.${index + 1}`}
          >
            ADD TO CART
          </button>
        </div>
      </Link>
    </ScrollReveal>
  );
}

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-amber-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-amber-50 transition-colors text-left"
        data-ocid="rudraksha.toggle"
      >
        <span className="font-semibold text-gray-800 text-sm">{q}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-amber-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-amber-600 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-4 bg-amber-50">
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Rudraksha() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden" style={{ background: "#FDF8F0" }}>
      {/* Back Arrow */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="fixed top-20 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all"
        style={{
          background: "transparent",
          border: "1.5px solid #C9A84C",
          boxShadow: "0 0 0 0 #C9A84C",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 8px 2px #C9A84C55";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
        aria-label="Go back"
        data-ocid="rudraksha.button"
      >
        <ArrowLeft className="w-5 h-5" style={{ color: "#C9A84C" }} />
      </button>

      {/* Hero Banner */}
      <section
        className="relative w-full overflow-hidden min-h-[220px] sm:min-h-[320px] md:min-h-[420px]"
        aria-label="Rudraksha Hero"
        id="2b5nyj-parent"
      >
        <img
          src="https://astrotalk.store/cdn/shop/files/Rudraksha_banner_banner_95cc659e-207f-4351-831f-4d2cdbe6edf8.webp?v=1768987983&width=1920"
          alt="Sacred Rudraksha Collection"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"
          id="1ogtiq1"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 py-16 md:py-24">
          <ScrollReveal>
            <span className="text-amber-400 text-[10px] tracking-[0.25em] font-semibold mb-3 block">
              JEWEL X · SACRED COLLECTION
            </span>
            <h1
              id="2b5nyj"
              className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 leading-tight"
            >
              Sacred Rudraksha
              <br />
              Collection
            </h1>
            <p
              id="han6le"
              className="text-white/80 text-sm md:text-base mb-6 max-w-md"
            >
              Born from the tears of Lord Shiva · 100% Original · Nepal Sourced
            </p>
            <a
              id="haauxf"
              href="#products"
              className="inline-flex items-center gap-2 bg-amber-600 text-white text-[11px] tracking-[0.2em] font-bold px-8 py-3 rounded-full hover:bg-amber-500 transition-colors w-fit"
              data-ocid="rudraksha.primary_button"
            >
              SHOP RUDRAKSHA <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-amber-800 text-white py-3 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {["t1", "t2", "t3", "t4"].map((key) => (
            <span
              key={key}
              className="text-[11px] tracking-[0.15em] font-semibold text-amber-200 flex-shrink-0"
            >
              ✅ 100% Original &nbsp;·&nbsp; 🏔️ Nepal Sourced &nbsp;·&nbsp; 🔬
              Lab Certified &nbsp;·&nbsp; 🙏 Energised by Experts &nbsp;·&nbsp;
              🔄 7 Day Returns
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://astrotalk.store/cdn/shop/files/Screenshot_16_1.webp?v=1753452365&width=1200"
                alt="What is Rudraksha"
                className="w-full h-auto block"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <span className="text-amber-600 text-[11px] tracking-[0.2em] font-semibold">
                ANCIENT WISDOM
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
                What is Rudraksha?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Rudraksha is a special and sacred seed from the{" "}
                <em>Elaeocarpus ganitrus</em> tree, grown in the Himalayan
                region. We source 100% original Rudraksha from Nepal. According
                to Hindu tradition, it was born from the tears of Lord Shiva.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The word 'Rudraksha' means the eye of Rudra. Each genuine
                Rudraksha has natural lines called mukhis (1–21), giving
                different spiritual properties.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⚡", label: "Full of positive energy" },
                  { icon: "🛡️", label: "Protection from negativity" },
                  { icon: "✨", label: "Cleanses your aura" },
                  { icon: "🧘", label: "Supports spiritual growth" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                  >
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-amber-600 text-[11px] tracking-[0.2em] font-semibold">
                CERTIFIED & ENERGIZED
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Buy 100% Original Rudraksha
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                0 to 21 Mukhi — Certified, Energized, Nepal Sourced
              </p>
            </div>
          </ScrollReveal>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            data-ocid="rudraksha.list"
          >
            {RUDRAKSHA_PRODUCTS.map((p, i) => (
              <RudrakshProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Types of Rudraksha */}
      <section className="py-16 md:py-24" style={{ background: "#FDF8F0" }}>
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-amber-600 text-[11px] tracking-[0.2em] font-semibold">
                MUKHIS & BENEFITS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Types of Rudraksha
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MUKHI_TYPES.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 30}>
                <div className="bg-white border border-amber-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${m.color} font-bold text-sm`}
                  >
                    {m.name.split(" ")[0]}
                  </div>
                  <h3 className="font-bold text-gray-800 text-xs mb-1">
                    {m.name}
                  </h3>
                  <p className="text-amber-600 text-[10px] font-semibold mb-2">
                    {m.deity}
                  </p>
                  <p className="text-gray-500 text-[10px] leading-relaxed">
                    {m.benefit}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="relative overflow-hidden min-h-[200px]">
        <img
          src="https://astrotalk.store/cdn/shop/files/Karungali_Rudraksha_Mala_1_1.webp?v=1767069413&width=1400"
          alt="Quality You Can Trust"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 py-16 md:py-20">
          <ScrollReveal>
            <span className="text-amber-400 text-[10px] tracking-[0.2em] font-semibold mb-2 block">
              JEWEL X PROMISE
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-5">
              Quality You Can Trust
            </h2>
            <ul className="space-y-2">
              {[
                "Lab-verified authenticity with certificate",
                "Nepal-origin beads — purest & most powerful",
                "Energised by expert astrologers before dispatch",
                "Handpicked for correct mukhis, no cracks",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-white/90 text-sm"
                >
                  <span className="text-amber-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose JEWEL X */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-amber-400 text-[11px] tracking-[0.2em] font-semibold">
                OUR PROMISE
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-2">
                Why Choose JEWEL X
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[
              { icon: "🔬", label: "100% Original Certified" },
              { icon: "🌏", label: "Nepal Sourced" },
              { icon: "🙏", label: "Verified by Astrologers" },
              { icon: "🏆", label: "Trusted by Millions" },
              { icon: "🔄", label: "7 Day Returns" },
            ].map((t, i) => (
              <ScrollReveal key={t.label} delay={i * 60}>
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="text-3xl">{t.icon}</span>
                  <p className="text-white text-xs font-semibold leading-snug">
                    {t.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-amber-600 text-[11px] tracking-[0.2em] font-semibold">
                CUSTOMER STORIES
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Real Results, Real People
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 60}>
                <div
                  className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex flex-col gap-3"
                  data-ocid="rudraksha.card"
                >
                  <img
                    src={`https:${t.img}`}
                    alt={t.name}
                    className="w-full aspect-square object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed italic">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-amber-600 text-[11px]">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" style={{ background: "#FDF8F0" }}>
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-amber-600 text-[11px] tracking-[0.2em] font-semibold">
                HAVE QUESTIONS?
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3" data-ocid="rudraksha.panel">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="text-amber-200 text-[11px] tracking-[0.2em] font-semibold">
              DISCOVER YOUR PERFECT MATCH
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Find Your Perfect Rudraksha
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-amber-800 text-[11px] tracking-[0.2em] font-bold px-10 py-4 rounded-full hover:bg-amber-100 transition-colors"
              data-ocid="rudraksha.secondary_button"
            >
              SHOP ALL RUDRAKSHA <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
