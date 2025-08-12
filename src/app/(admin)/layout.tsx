export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex-1 overflow-y-auto">{children}</main>;
}
