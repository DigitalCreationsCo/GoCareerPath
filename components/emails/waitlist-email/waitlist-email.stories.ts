import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WaitlistEmail } from './waitlist-email';

const meta = {
  title: 'Email/WaitlistEmail',
  component: WaitlistEmail,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WaitlistEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    username: 'John',
  },
};
