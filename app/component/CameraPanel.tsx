"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraPanel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // START CAMERA
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

      setCameraOn(true);
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera permission is required for interview evaluation.");
    }
  };

  // STOP CAMERA
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  // CLEANUP when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111",
        borderRadius: "12px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3 style={{ color: "white", textAlign: "center" }}>
        Camera Evaluation
      </h3>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "300px",
          background: "black",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />

      {!cameraOn ? (
        <button
          onClick={startCamera}
          style={{
            padding: "10px",
            background: "#22c55e",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Start Camera
        </button>
      ) : (
        <button
          onClick={stopCamera}
          style={{
            padding: "10px",
            background: "#ef4444",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Stop Camera
        </button>
      )}
    </div>
  );
}