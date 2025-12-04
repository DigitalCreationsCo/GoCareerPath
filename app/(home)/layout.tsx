import { auth } from "@/auth";
import { Header } from "@/components/ui/header";

export default async function Layout({ children }: { children: React.ReactNode; }) {
  const session = await auth();
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header session={ session } />
      {children}
    </div>
  );
}
