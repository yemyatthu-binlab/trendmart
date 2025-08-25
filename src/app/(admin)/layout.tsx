export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>;
}
