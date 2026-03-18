import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Gem } from "lucide-react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Login() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/orders" });
  }, [isAuthenticated, navigate]);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Gem className="w-8 h-8 text-gold" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-3">
          Welcome to JEWEL X
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Sign in to access your orders, wishlist, and exclusive member
          benefits.
        </p>
        <Button
          onClick={handleAuth}
          disabled={isLoggingIn}
          className="w-full bg-foreground text-primary-foreground text-[11px] tracking-widest h-12 rounded-sm"
          data-ocid="login.submit_button"
        >
          {isLoggingIn ? "SIGNING IN..." : "SIGN IN WITH INTERNET IDENTITY"}
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Secure, decentralised authentication — no passwords needed.
        </p>
      </div>
    </main>
  );
}
