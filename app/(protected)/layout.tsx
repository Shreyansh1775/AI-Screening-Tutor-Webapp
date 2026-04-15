"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/(protected)/component/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/login");
        } else {
          setLoading(false);
        }
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}