import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import BackButton from "../components/BackButton";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <BackButton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3">
            REACH OUT ANYTIME
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Contact Us
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* Hero contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone card */}
          <a
            href="tel:+918002173042"
            className="group flex flex-col items-center text-center bg-card rounded-xl p-8 shadow-card border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:shadow-card-hover"
            data-ocid="contact.phone.link"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <Phone className="w-7 h-7 text-gold" />
            </div>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">
              CALL US
            </p>
            <p className="font-serif text-2xl font-semibold text-foreground group-hover:text-gold transition-colors">
              +91 8002173042
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Tap to call directly
            </p>
          </a>

          {/* Email card */}
          <a
            href="mailto:akku79044@gmail.com"
            className="group flex flex-col items-center text-center bg-card rounded-xl p-8 shadow-card border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:shadow-card-hover"
            data-ocid="contact.email.link"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <Mail className="w-7 h-7 text-gold" />
            </div>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">
              EMAIL US
            </p>
            <p className="font-serif text-xl font-semibold text-foreground group-hover:text-gold transition-colors break-all">
              akku79044@gmail.com
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Tap to compose email
            </p>
          </a>

          {/* Availability / WhatsApp card */}
          <a
            href="https://wa.me/918002173042"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center bg-card rounded-xl p-8 shadow-card border border-gold/20 hover:border-[#25D366]/60 transition-all duration-300 hover:shadow-card-hover"
            data-ocid="contact.whatsapp.button"
          >
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-5 group-hover:bg-[#25D366]/20 transition-colors">
              <SiWhatsapp className="w-7 h-7 text-[#25D366]" />
            </div>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">
              WHATSAPP
            </p>
            <p className="font-serif text-2xl font-semibold text-foreground group-hover:text-[#25D366] transition-colors">
              Chat Now
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="w-3 h-3 text-gold" />
              <p className="text-xs text-muted-foreground">24/7 Available</p>
            </div>
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="w-4 h-4 text-gold" />
            <span className="text-[10px] tracking-[0.2em]">
              OR SEND A MESSAGE
            </span>
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-lg p-6 md:p-8 shadow-card space-y-5"
            data-ocid="contact.form"
          >
            <h2 className="font-serif text-xl font-semibold text-center mb-2">
              Send a Message
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="c-name" className="text-xs tracking-widest">
                  YOUR NAME
                </Label>
                <Input
                  id="c-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1"
                  required
                  data-ocid="contact.name.input"
                />
              </div>
              <div>
                <Label htmlFor="c-email" className="text-xs tracking-widest">
                  EMAIL ADDRESS
                </Label>
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="mt-1"
                  required
                  data-ocid="contact.email.input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="c-subject" className="text-xs tracking-widest">
                SUBJECT
              </Label>
              <Input
                id="c-subject"
                value={form.subject}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subject: e.target.value }))
                }
                className="mt-1"
                data-ocid="contact.subject.input"
              />
            </div>
            <div>
              <Label htmlFor="c-msg" className="text-xs tracking-widest">
                MESSAGE
              </Label>
              <Textarea
                id="c-msg"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="mt-1 min-h-32"
                required
                data-ocid="contact.message.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-primary-foreground text-[11px] tracking-widest h-11 rounded-sm"
              data-ocid="contact.form.submit_button"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
