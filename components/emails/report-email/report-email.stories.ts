import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReportEmail } from './report-email';

const meta = {
  title: 'Email/ReportEmail',
  component: ReportEmail,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ReportEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    markdownContent: '## Your Personalized Career Report is Ready!',
    pdfDownloadUrl: '#',
  },
};
