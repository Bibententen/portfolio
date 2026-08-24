import type { HTMLAttributes, PropsWithChildren } from "react";

export function Prose({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`prose${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </div>
  );
}
