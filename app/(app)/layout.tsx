import { auth } from "@/auth";
import { Header } from "@/components/ui/header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await auth();
  return (
    <div className="relative flex flex-col h-screen bg-gradient-primary-glow">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background animate-gradient" />
      <Header session={ session } />
      { children }
    </div>
  );
}
