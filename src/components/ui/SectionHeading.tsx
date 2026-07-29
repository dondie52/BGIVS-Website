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
        <p className={`section-label mb-3 ${light ? "text-light-gold" : ""}`}>{label}</p>
      ) : null}
      <h2 className={`text-3xl sm:text-4xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {description ? (
        <p className={`mt-4 text-base sm:text-lg ${light ? "text-white/85" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
