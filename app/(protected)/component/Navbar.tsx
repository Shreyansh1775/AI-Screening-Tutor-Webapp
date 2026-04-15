"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `cursor-pointer px-4 py-2 rounded-md transition ${
      pathname === path
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <div className="w-full border-b bg-white px-6 py-3 flex justify-between items-center shadow-sm">
      <h1
        className="font-semibold text-lg cursor-pointer"
        onClick={() => router.push("/")}
      >
        AI Screening Tutor
      </h1>

      <div className="flex gap-3 items-center">
        <span className={linkStyle("/")} onClick={() => router.push("/")}>
          Home
        </span>

        <span
          className={linkStyle("/interview")}
          onClick={() => router.push("/interview")}
        >
          Interview
        </span>

        <span
          className={linkStyle("/report")}
          onClick={() => router.push("/report")}
        >
          Reports
        </span>

        <span
          className={linkStyle("/profile")}
          onClick={() => router.push("/profile")}
        >
          Profile
        </span>

        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}