export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-blue-950 text-white">
      {children}
    </div>
  );
}
