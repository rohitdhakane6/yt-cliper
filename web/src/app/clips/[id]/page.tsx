"use client";
import * as React from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Scissors, Download, Clock, Loader2 } from "lucide-react";
import { TimePicker } from "@/components/time-picker";

export default function Page({ params }: { params: { id: string } }) {
  const { id: videoId } = React.use(params);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [clipURL, setClipURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClip = async () => {
    console.log(endTime)
    if (endTime<0) {
      toast.error("End time must be filled");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be greater than start time");
      return;
    }
    if (endTime - startTime > 60) {
      toast.error("Clip duration cannot exceed 60 seconds");
      return;
    }

    setIsProcessing(true);
    const toastId=toast.loading("Processing clip...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/download",
        {
          url: `https://www.youtube.com/watch?v=${videoId}`,
          start_time: startTime,
          end_time: endTime,
        },
        {
          responseType: "blob",
        }
      );

      if (res.status !== 200) {
        toast.error("Failed to process clip");
        return;
      }

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      setClipURL(url);

      toast.success("Clip ready to download!");
    } catch (err) {
      toast.error("Something went wrong while clipping.");
      console.error(err);
    } finally {
      setIsProcessing(false);
      toast.dismiss(toastId)
    }
  };

  const handleDownload = () => {
    if (!clipURL) return;
    const a = document.createElement("a");
    a.href = clipURL;
    a.download = `youtube-clip-${videoId}.mp4`;
    a.click();
    window.URL.revokeObjectURL(clipURL);
  };

  return (
    <div className="min-h-screen h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <h1 className="text-3xl font-bold">Video Clipper</h1>
          <p className="mt-2">
            Create and download custom clips from YouTube videos
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div
            layout
            transition={{
              layout: { duration: 0.6, type: "spring" },
            }}
            className="w-full"
          >
            {/* Main content area */}
            <div className={`flex flex-col ${clipURL ? "" : "items-center"}`}>
              {/* Video and Download Area - side by side when download is available */}
              <motion.div
                layout
                className={`flex ${
                  clipURL ? "md:flex-row" : "flex-col items-center"
                } gap-6 w-full`}
              >
                {/* Left side: YouTube Embed with Settings under it */}
                <motion.div
                  layout
                  className={`${
                    clipURL ? "md:w-1/2" : "max-w-2xl w-full"
                  } flex flex-col`}
                >
                  {/* YouTube Embed */}
                  <Card className="overflow-hidden shadow">
                    <CardContent>
                      <div className="">
                        <div className="aspect-video w-full">
                          <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                            title="YouTube video player"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent>
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Scissors size={20} className="mr-2" />
                        Clip Settings
                      </h2>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="start"
                              className="flex items-center"
                            >
                              <Clock size={14} className="mr-2" />
                              Start Time
                            </Label>
                            <div className="relative">
                              <TimePicker
                                seconds={startTime}
                                setSeconds={setStartTime}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="end" className="flex items-center">
                              <Clock size={14} className="mr-2" />
                              End Time
                            </Label>
                            <div className="relative">
                              <TimePicker
                                seconds={endTime}
                                setSeconds={setEndTime}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-2">
                          <Button
                            onClick={handleClip}
                            disabled={isProcessing}
                            className="w-full"
                          >
                            {isProcessing ? (
                              <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2" />
                                Processing...
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <Scissors size={18} className="mr-2" />
                                Create Clip
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Right side: Download section - appears when available */}
                {clipURL && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:w-1/2"
                  >
                    <Card className="h-full shadow">
                      <CardContent>
                        <div className="flex-grow">
                          <video
                            controls
                            className="rounded-md w-full h-auto"
                            src={clipURL}
                          />
                        </div>
                        <Button
                          onClick={handleDownload}
                          className="w-full mt-4"
                        >
                          <Download size={18} className="mr-2" />
                          Download Clip
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
