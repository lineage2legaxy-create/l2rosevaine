import type { ReactNode } from "react";

interface ChronicleButtonProps {
  href: string | null;
  children: ReactNode;
  variant?: "gold" | "violet";
  ariaLabel?: string;
}

const sharedClassName =
  "chronicle-button group relative inline-flex min-h-11 min-w-44 items-center justify-center overflow-hidden border px-7 py-3 font-sans text-sm font-bold tracking-[0.04em] uppercase [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] motion-safe:transition-[transform,color,background-color,border-color] motion-safe:duration-200 motion-safe:ease-[var(--ease-out-quart)] motion-safe:active:scale-[0.97]";

const variantClassNames = {
  gold: "border-[#bba269] bg-[#bba269] text-[#09070d] hover:border-[#d4c18d] hover:bg-[#d4c18d]",
  violet:
    "border-amethyst/70 bg-obsidian-soft text-ivory hover:border-amethyst hover:bg-amethyst/15",
} as const;

export function ChronicleButton({
  href,
  children,
  variant = "gold",
  ariaLabel,
}: ChronicleButtonProps) {
  const className = `${sharedClassName} ${variantClassNames[variant]}`;

  if (href === null) {
    return (
      <span
        aria-label={ariaLabel ? `${ariaLabel}, Próximamente` : undefined}
        aria-disabled="true"
        className={`${className} cursor-not-allowed opacity-60`}
      >
        <span>{children}</span>
        <span className="ml-2 text-[0.65rem] font-medium normal-case">
          Próximamente
        </span>
      </span>
    );
  }

  return (
    <a href={href} aria-label={ariaLabel} className={className}>
      {children}
    </a>
  );
}
