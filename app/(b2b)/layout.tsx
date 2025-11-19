import { auth } from "@/auth";
import { Header } from "@/components/ui/header/header";

export default async function B2BLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await auth();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <Header session={session} />
      </div>
      { children }
    </div>
  );
}
