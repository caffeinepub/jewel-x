import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3">
            GET IN TOUCH
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Contact Us
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-lg p-6 md:p-8 shadow-card space-y-5"
              data-ocid="contact.form"
            >
              <h2 className="font-serif text-xl font-semibold">
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

          {/* Info */}
          <aside className="lg:col-span-2 space-y-6">
            {/* Direct Contact */}
            <div className="bg-card rounded-lg p-6 shadow-card border border-gold/20">
              <h3 className="font-serif text-lg font-semibold mb-5">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      PHONE
                    </p>
                    <a
                      href="tel:+918002173042"
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      +91 8002173042
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      EMAIL
                    </p>
                    <a
                      href="mailto:akku79044@gmail.com"
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      akku79044@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      HOURS
                    </p>
                    <p className="text-sm text-muted-foreground">
                      24/7 Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918002173042"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-lg p-4 shadow-card hover:bg-[#20bc59] transition-colors"
              data-ocid="contact.whatsapp.button"
            >
              <SiWhatsapp className="w-6 h-6" />
              <div>
                <p className="font-medium text-sm">Chat on WhatsApp</p>
                <p className="text-xs text-white/80">
                  Usually replies within minutes
                </p>
              </div>
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
