import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold-outline";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  external?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-deep-navy hover:bg-bright-gold border border-gold-dark font-semibold shadow-sm",
  secondary:
    "bg-white text-navy hover:bg-off-white border border-white/80 font-semibold",
  outline:
    "bg-transparent text-navy border border-navy/25 hover:border-gold-dark hover:text-navy font-semibold",
  "gold-outline":
    "bg-transparent text-white border border-gold hover:bg-gold hover:text-deep-navy font-semibold",
  ghost: "bg-transparent text-blue hover:text-navy font-semibold underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
  ariaLabel,
  external,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-blue disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
