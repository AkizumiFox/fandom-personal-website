import { cookies } from "next/headers";
import { ThemeToggleClient } from "./theme-toggle-client";

const STORAGE_KEY = "theme-mode";

type ThemeToggleProps = {
  className?: string;
};

export async function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get(STORAGE_KEY)?.value === "autumn-dark";

  return <ThemeToggleClient className={className} initialIsDark={isDark} />;
}
