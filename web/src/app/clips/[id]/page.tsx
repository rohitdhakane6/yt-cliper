"use client";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ClipViewPage({ params }) {
  const { id: videoId } = React.use(params);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleClip = () => {
    if (!startTime || !endTime) {
      toast.error("Both start and end time must be filled");
      return;
    }

    if (parseFloat(endTime) <= parseFloat(startTime)) {
      toast.error("End time must be greater than start time");
      return;
    }

    toast.success("🚀 Processing clip...");
    // Add backend API call here if needed
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted"
    >
      <Card className="w-full max-w-3xl space-y-6 p-6">
        <CardContent className="flex flex-col gap-6 items-center">
          <h1 className="text-2xl font-semibold text-center">
            🎬 Clipping Video: {videoId}
          </h1>

          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="start">Start Time (seconds)</Label>
              <Input
                id="start"
                type="number"
                placeholder="e.g. 30"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="end">End Time (seconds)</Label>
              <Input
                id="end"
                type="number"
                placeholder="e.g. 90"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleClip} className="w-full md:w-auto">
            ✂️ Clip this Video
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
