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
        <p className={`section-label mb-3 block font-semibold tracking-wider ${light ? "text-gold" : ""}`}>{label}</p>
      ) : null}
      <h2 className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-white/85" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
