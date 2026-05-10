import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/playground", label: "Lab" },
    { to: "/lab", label: "Lab+" },
    { to: "/contact", label: "Contact" },
  ] as const;
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 mix-blend-difference transition-all ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 text-white md:px-12">
        <Link to="/" className="text-2xl font-black tracking-tight" data-cursor="hover">
          KRIS<span className="text-[var(--neon)]">●</span>
        </Link>
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.3em] md:flex">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              data-cursor="hover"
              activeProps={{ className: "text-[var(--neon)]" }}
              activeOptions={{ exact: true }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          data-cursor="hover"
          className="rounded-full border border-white px-5 py-2 text-xs uppercase tracking-[0.25em]"
        >
          Start →
        </Link>
      </div>
    </header>
  );
}
