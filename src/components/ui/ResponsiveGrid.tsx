import { type ReactNode } from "react";

type ResponsiveGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ResponsiveGrid({
  children,
  columns = 3,
  className = "",
}: ResponsiveGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns]} ${className}`}>
      {children}
    </div>
  );
}
