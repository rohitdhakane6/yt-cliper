"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider"; // adjust as needed
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const {  toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={(e) => {
        const coords = { x: e.clientX, y: e.clientY };
        toggleTheme(coords);
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
