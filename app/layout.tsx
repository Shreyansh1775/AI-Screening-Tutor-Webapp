import "./globals.css";
import ClientLayout from "@/app/(protected)/component/ClientLayout";

export const metadata = {
  title: "AI Interviewer",
  description: "AI-powered interview and evaluation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}