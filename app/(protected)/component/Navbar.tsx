"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-md cursor-pointer transition ${
      pathname === path
        ? "bg-black text-white font-medium"
        : "text-gray-600 hover:text-black"
    }`;
    
const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  router.push("/login");
  router.refresh(); // ensures middleware re-check
};

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b bg-white gap-3">
      <h1 className="text-lg font-semibold">Shreyansh's Interv AI</h1>

      <div className="flex flex-wrap items-center gap-3 md:gap-6">
        <span onClick={() => router.push("/")} className={linkClass("/")}>
          Home
        </span>

        <span
          onClick={() => router.push("/interview")}
          className={linkClass("/interview")}
        >
          Interview
        </span>

        <span
          onClick={() => router.push("/report")}
          className={linkClass("/report")}
        >
          Reports
        </span>

        <span
          onClick={() => router.push("/profile")}
          className={linkClass("/profile")}
        >
          Profile
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}