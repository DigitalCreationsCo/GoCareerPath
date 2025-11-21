import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InviteEmployeeEmail } from './invite-employee-email';

const meta = {
    title: 'Email/InviteEmployeeEmail',
    component: InviteEmployeeEmail,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof InviteEmployeeEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        teamName: 'Acme Inc.',
        inviteLink: '#',
    },
};
