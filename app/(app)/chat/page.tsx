import ClientChatWrapper from "@/components/chat-client-wrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewChatPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }
  return (
    <ClientChatWrapper initialMessages={[]} finalReport={null} />
  );
}