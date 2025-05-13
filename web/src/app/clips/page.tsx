"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ClipInputPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const extractVideoId = (youtubeUrl: string): string | null => {
    const match = youtubeUrl.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSubmit = () => {
    const videoId = extractVideoId(url.trim());

    if (!videoId) {
      toast.error(" Invalid YouTube URL", {
        description:
          "Format should be https://www.youtube.com/watch?v=VIDEO_ID",
      });
      return;
    }

    setLoading(true);
    toast.success("Redirecting to clip...");
    router.push(`/clips/${videoId}`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Enter YouTube Video URL</h2>

          <Input
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Clip it"}
          </Button>
        </CardContent>
      </Card>
    </motion.main>
  );
}
