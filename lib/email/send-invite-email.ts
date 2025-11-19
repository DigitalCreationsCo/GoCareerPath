import { getResend, adminEmailAddress } from "./resend";
import { InviteEmployeeEmail } from "@/components/emails/invite-employee-email";

export async function sendInviteEmail(email: string, organizationName: string, inviteLink: string) {
  const { data, error } = await getResend().emails.send({
    from: `GoCareerPath <${adminEmailAddress}>`,
    to: [email],
    subject: `You're invited to join ${organizationName} on GoCareerPath`,
    react: InviteEmployeeEmail({ organizationName, inviteLink }),
  });

  if (error) {
    console.error(`Failed to send invite email to ${email}:`, error);
    throw new Error(error.message);
  }

  return data;
}
