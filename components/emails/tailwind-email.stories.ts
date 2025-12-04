import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TailwindEmail } from './tailwind-email';

const meta = {
  title: 'Email/TailwindEmail',
  component: TailwindEmail,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TailwindEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Hello, world!',
  },
};
