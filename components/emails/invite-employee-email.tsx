import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { TailwindEmail } from './tailwind-email';

interface InviteEmployeeEmailProps {
  organizationName: string;
  inviteLink: string;
}

export const InviteEmployeeEmail = ({
  organizationName,
  inviteLink,
}: InviteEmployeeEmailProps) => (
  <TailwindEmail>
    <Html>
      <Head />
      <Preview>Complete your 3-minute skill snapshot for {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Join {organizationName} on GoCareerPath</Heading>
          <Text style={text}>
            Your team is using GoCareerPath to map skills, identify growth opportunities, and build career paths.
            To get started, please complete your 3-minute skill snapshot.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={inviteLink}>
              Complete Your Skill Snapshot
            </Button>
          </Section>
          <Text style={text}>
            This snapshot will help us understand your current skills and identify areas where you can grow.
          </Text>
          <Text style={footer}>
            GoCareerPath
          </Text>
        </Container>
      </Body>
    </Html>
  </TailwindEmail>
);

export default InviteEmployeeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '5px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 20px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '20px',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 20px',
};
