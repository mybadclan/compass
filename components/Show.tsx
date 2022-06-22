import { ReactNode } from "react";

interface ShowProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Show({ when, children, fallback }: ShowProps) {
  if (!when) return <>{fallback}</>;

  return (
    <>
      {children}
    </>
  );
}