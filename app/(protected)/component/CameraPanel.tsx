"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraPanel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState("");

  // AUTO START CAMERA
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Camera permission denied");
      }
    };

    startCamera();

    return () => {
      // CLEANUP
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  return (
    <div className="w-full bg-black/80 backdrop-blur rounded-xl p-3 shadow-md">
      <p className="text-xs text-white/70 mb-2 text-center">
        Camera Evaluation
      </p>

      <div className="w-full aspect-square rounded-lg overflow-hidden bg-black">
        {error ? (
          <div className="text-red-400 text-sm flex items-center justify-center h-full">
            {error}
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]" // mirror effect
          />
        )}
      </div>
    </div>
  );
}