import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
