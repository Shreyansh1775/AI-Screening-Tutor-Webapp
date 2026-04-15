"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `cursor-pointer ${
      pathname === path
        ? "text-indigo-600 font-semibold"
        : "text-gray-600 hover:text-indigo-600"
    }`;

const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  router.push("/login");
  router.refresh(); // ensures middleware re-check
};

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h1 className="text-lg font-semibold">AI Interview Platform</h1>

      <div className="flex items-center space-x-6">
        <span onClick={() => router.push("/home")} className={linkClass("/")}>
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
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}