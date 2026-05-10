import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      const t = e.target as HTMLElement;
      setHover(!!t.closest("[data-cursor='hover'], a, button"));
    };
    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-[var(--neon)] mix-blend-difference" />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[199] h-9 w-9 rounded-full border border-white mix-blend-difference transition-[width,height,opacity] duration-200"
        style={{ width: hover ? 56 : 36, height: hover ? 56 : 36, opacity: hover ? 1 : 0.7 }}
      />
    </>
  );
}
