import { ThemeProvider } from "@/components/theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
