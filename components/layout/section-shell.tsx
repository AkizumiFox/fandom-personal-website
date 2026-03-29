import { cn } from "@/lib/utils";

type SectionShellProps = {
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({ className, children }: SectionShellProps) {
  return <section className={cn("container-shell", className)}>{children}</section>;
}
