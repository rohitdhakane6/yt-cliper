"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimePickerProps {
  seconds: number;
  setSeconds: (seconds: number) => void;
}

export function TimePicker({ seconds, setSeconds }: TimePickerProps) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const updateTime = (h: number, m: number, s: number) => {
    const total = h * 3600 + m * 60 + s;
    console.log("Total seconds:", total);
    setSeconds(total);
  };

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <Input
          id="hours"
          type="number"
          value={hours}
          onChange={(e) => updateTime(Number(e.target.value), minutes, secs)}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <Input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => updateTime(hours, Number(e.target.value), secs)}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <Input
          id="seconds"
          type="number"
          value={secs}
          onChange={(e) => updateTime(hours, minutes, Number(e.target.value))}
        />
      </div>
    </div>
  );
}
