import { auth } from "@/auth";
import { Header } from "@/components/ui/header/header";

export default async function Layout({ children }: { children: React.ReactNode; }) {
  const session = await auth();
  return (
    <section className="flex flex-col min-h-screen">
      <div className='absolute z-10 w-full'>
        <Header session={ session } />
      </div>
      {children}
    </section>
  );
}
