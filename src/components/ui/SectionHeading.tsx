type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <div
      id={id}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {label ? (
        <p className={`section-label mb-3 block text-xs font-bold uppercase tracking-wider ${light ? "text-light-gold" : "text-gold-dark"}`}>{label}</p>
      ) : null}
      <h2 style={{ fontSize: "clamp(2rem, 8vw, 2.75rem)" }} className={`font-serif font-bold leading-tight ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 leading-relaxed sm:text-lg ${light ? "text-white/85" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
