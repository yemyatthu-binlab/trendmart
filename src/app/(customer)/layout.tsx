import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 overflow-y-auto bg-white">
      {children}
      <Toaster richColors position="top-right" />
    </main>
  );
}
