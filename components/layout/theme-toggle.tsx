import { cookies } from "next/headers";
import { ThemeToggleClient } from "./theme-toggle-client";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "theme-mode";

type ThemeToggleProps = {
  className?: string;
  dict: Dictionary;
};

export async function ThemeToggle({ className = "", dict }: ThemeToggleProps) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get(STORAGE_KEY)?.value !== "autumn-light";

  return (
    <ThemeToggleClient
      className={className}
      initialIsDark={isDark}
      toLightLabel={dict.theme.toLight}
      toDarkLabel={dict.theme.toDark}
    />
  );
}
