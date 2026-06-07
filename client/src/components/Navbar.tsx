import { Link, useLocation } from "wouter";
import { Brain, History, Info, PlusCircle, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("nav.newAnalysis"), icon: PlusCircle },
    { href: "/history", label: t("nav.history"), icon: History },
    { href: "/pricing", label: t("nav.pricing"), icon: Zap },
    { href: "/about", label: t("nav.about"), icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Decision<span className="text-primary">Simulator</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                location === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <LanguageSwitcher />
          <Link href="/pricing">
            <Button size="sm" className="font-semibold">
              {t("nav.upgrade")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top duration-200">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors",
                location === item.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          <div className="px-3">
            <LanguageSwitcher />
          </div>
          <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full font-semibold">{t("nav.upgrade")}</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
