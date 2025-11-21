import { getResend, adminEmailAddress } from "./resend";
import { InviteEmployeeEmail } from "@/components/emails/invite-employee-email";

export async function sendInviteEmployeeEmail(email: string, teamName: string, inviteLink: string) {
  const { data, error } = await getResend().emails.send({
    from: `GoCareerPath <${adminEmailAddress}>`,
    to: [ email ],
    subject: `You're invited to join ${teamName} on GoCareerPath`,
    react: InviteEmployeeEmail({ teamName, inviteLink }),
  });

  if (error) {
    console.error(`Failed to send invite email to ${email}:`, error);
    throw new Error(error.message);
  }

  return data;
}
