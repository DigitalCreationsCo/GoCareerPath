import ClientChatWrapper from "@/components/chat-client-wrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewChatPage() {
  const user = (await auth())?.user;
  if (!user?.id) {
    redirect('/sign-in');
  }
  return (
      <ClientChatWrapper initialMessages={[]} finalReport="" />
  );
}