import { getResend, adminEmailAddress } from "./resend";
import { InviteUserEmail } from "@/components/emails/invite-user-email";

export async function sendInviteEmail(email: string, teamName: string, inviteLink: string) {
  const { data, error } = await getResend().emails.send({
    from: `GoCareerPath <${adminEmailAddress}>`,
    to: [ email ],
    subject: `You're invited to join ${teamName} on GoCareerPath`,
    react: InviteUserEmail({ teamName, inviteLink }),
  });

  if (error) {
    console.error(`Failed to send invite email to ${email}:`, error);
    throw new Error(error.message);
  }

  return data;
}
