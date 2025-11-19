import { copyright } from '@/lib/utils';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { TailwindEmail } from './tailwind-email';

interface InviteUserEmailProps {
  teamName: string;
  inviteLink: string;
}

export const InviteUserEmail = ({
  teamName,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Complete your 3-minute skill snapshot for ${teamName}`;

  return (
    <TailwindEmail>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="px-2 mx-auto font-sans bg-white">
          <Container className="rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* Logo */}
            <Section className="mt-[8px] text-center flex items-center justify-center gap-2">
              <Img
                src="https://www.gocareerpath.com/favicon.ico"
                width="25"
                height="25"
                alt="GoCareerPath"
                className="inline"
              />
              <Text className="inline ml-2 text-lg text-muted-foreground">
                GoCareerPath
              </Text>
            </Section>

            {/* Headline */}
            <Heading className="text-2xl text-center mt-[24px] mb-[24px] text-black">
              Join {teamName}
              <br />
              <span className="text-success">on GoCareerPath</span>
            </Heading>

            {/* Instructions */}
            <Text className="text-black text-sm leading-[22px] mb-2">
              Your team is using GoCareerPath to map skills, identify growth
              opportunities, and build career paths. To get started, please
              complete your 3-minute skill snapshot.
            </Text>

            {/* CTA */}
            <Section className="text-center mt-[18px]">
              <Button
                className="bg-primary rounded text-white text-[16px] font-bold no-underline px-8 py-4"
                href={inviteLink}
                target="_blank"
              >
                Complete Your Skill Snapshot
              </Button>
            </Section>

            <Text className="text-[#666666] text-[12px] leading-[20px] mt-[16px]">
              This snapshot will help us understand your current skills and
              identify areas where you can grow.
            </Text>
            <Text className="text-[#666666] text-center leading-[20px] mt-[8px]">
              {copyright}
            </Text>
          </Container>
        </Body>
      </Html>
    </TailwindEmail>
  );
};

export default InviteUserEmail;
