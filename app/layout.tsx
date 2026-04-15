import "./globals.css";
import Navbar from "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hideNavbar =
    typeof window !== "undefined" &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/register");

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}