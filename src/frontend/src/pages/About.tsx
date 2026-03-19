import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Gem, Heart, Leaf } from "lucide-react";
import BackButton from "../components/BackButton";
import ScrollReveal from "../components/ScrollReveal";

export default function About() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <BackButton />
      {/* Hero */}
      <section className="relative bg-foreground text-primary-foreground py-24 md:py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-banner.dim_1400x700.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.4em] text-gold mb-4">
            SINCE 2018
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            The JEWEL X Story
          </h1>
          <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed">
            Born from a deep reverence for India's golden heritage and a desire
            to make luxury feel personal.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3">
                OUR BEGINNING
              </p>
              <h2 className="font-serif text-3xl font-bold mb-5">
                Crafted with Purpose
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                JEWEL X was founded in 2018 in Jaipur — India's jewellery
                capital — by designer Riya Mehta, who grew up watching her
                grandmother wear heirloom gold that told stories of generations
                past. Riya wanted to create that same connection for a new
                generation of Indian women.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                What began as a small studio with three master craftsmen has
                grown into a beloved brand worn by thousands across India. Our
                philosophy remains unchanged: every piece must be worthy of
                becoming someone's most treasured possession.
              </p>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-card-hover">
              <img
                src="/assets/generated/category-necklaces.dim_600x400.jpg"
                alt="Our craft"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="bg-card py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3">
                WHAT DRIVES US
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Our Values
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-4" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Gem,
                title: "Uncompromising Quality",
                desc: "BIS-hallmarked gold and conflict-free gemstones only",
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Every piece is handcrafted by master artisans in Jaipur",
              },
              {
                icon: Leaf,
                title: "Ethically Sourced",
                desc: "We partner only with certified, responsible suppliers",
              },
              {
                icon: Award,
                title: "Lifetime Commitment",
                desc: "Complimentary polish and maintenance for every piece",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="text-center p-5">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-base font-semibold mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3">
            OUR MISSION
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            To democratise luxury jewellery without compromising on craft.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We believe every woman deserves to wear something extraordinary. By
            cutting out middlemen and working directly with artisans, we make
            heirloom-quality jewellery accessible at honest prices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-3 text-[11px] tracking-widest rounded-full hover:bg-foreground/90 transition-colors"
            data-ocid="about.shop_now.button"
          >
            EXPLORE THE COLLECTION <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
