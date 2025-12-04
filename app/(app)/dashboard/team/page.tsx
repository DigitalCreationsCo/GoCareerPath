'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/types';
import { removeTeamMember, inviteTeamMember } from '@/app/(login)/actions';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle } from 'lucide-react';

type ActionState = {
  error?: string;
  success?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SubscriptionSkeleton() {
  return (
    <div className="mb-8 h-[140px]">
      <h2>Team Subscription</h2>
    </div>
  );
}

function ManageSubscription() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);

  return (
    <div className="mb-8">
      <h2>Team Subscription</h2>
      <Card className="p-4 my-4 space-y-4">
        <div className="flex flex-col items-start space-x-4 sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <p className="font-medium">
              Current Plan: { teamData?.planName || 'Free' }
            </p>
            <p className="text-sm text-muted-foreground">
              { teamData?.subscriptionStatus === 'active'
                ? 'Billed monthly'
                : teamData?.subscriptionStatus === 'trialing'
                  ? 'Trial period'
                  : 'No active subscription' }
            </p>
          </div>
          <form action={ customerPortalAction }>
            <Button type="submit" variant="outline">
              Manage Subscription
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function TeamMembersSkeleton() {
  return (
    <div className="mb-8 h-[140px]">
      <h2>Team Members</h2>
      <div className="py-4 mt-1 space-y-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-full size-8"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamMembers() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);
  const [ removeState, removeAction, isRemovePending ] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  if (!teamData?.users?.length) {
    return (
      <div className="mb-8">
        <h2>Team Members</h2>
        <Card className="p-4 my-4">
          <p className="py-4 text-muted-foreground">No team members yet.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2>Team Members</h2>
      <Card className="p-4 my-4">
        <ul className="space-y-4">
          { teamData.users.map((member, index) => (
            <li key={ member.id } className="flex items-center justify-between p-2 text-sm rounded bg-muted">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {/* 
                    This app doesn't save profile images, but here
                    is how you'd show them:

                    <AvatarImage
                      src={member.user.image || ''}
                      alt={getUserDisplayName(member.user)}
                    />
                  */}
                  <AvatarFallback>
                    { getUserDisplayName(member)
                      .split(' ')
                      .map((n) => n[ 0 ])
                      .join('') }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    { getUserDisplayName(member) }
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    { member.role }
                  </p>
                </div>
              </div>
              { index > 1 ? (
                <form action={ removeAction }>
                  <input type="hidden" name="memberId" value={ member.id } />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={ isRemovePending }
                  >
                    { isRemovePending ? 'Removing...' : 'Remove' }
                  </Button>
                </form>
              ) : null }
            </li>
          )) }
        </ul>
        { removeState?.error && (
          <p className="mt-4 text-red-500">{ removeState.error }</p>
        ) }
      </Card>
    </div>
  );
}

function InviteTeamMemberSkeleton() {
  return (
    <div className="h-[260px]">
      <h2>Invite Team Member</h2>
    </div>
  );
}

function InviteTeamMember() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const isOwner = user?.role === 'owner';
  const [ inviteState, inviteAction, isInvitePending ] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, {});

  return (
    <div>
      <h2>Invite Team Member</h2>
      <Card className="p-4 my-4">
        <form action={ inviteAction } className="space-y-4">
          <div className='max-w-lg'>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={ !isOwner }
            />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={ !isOwner }
            >
              <div className="flex items-center mt-2 space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">Member</Label>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner">Owner</Label>
              </div>
            </RadioGroup>
          </div>
          { inviteState?.error && (
            <p className="text-red-500">{ inviteState.error }</p>
          ) }
          { inviteState?.success && (
            <p className="text-success">{ inviteState.success }</p>
          ) }
          <Button
            type="submit"
            className="text-white bg-primary hover:bg-primary-glow"
            disabled={ isInvitePending || !isOwner }
          >
            { isInvitePending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                Invite Member
              </>
            ) }
          </Button>
        </form>
      </Card>
      { !isOwner && (
        <p className="text-sm text-muted-foreground">
          You must be a team owner to invite new members.
        </p>
      ) }
    </div>
  );
}

export default function SettingsPage() {
  return (
    <section className="flex-1 px-4 lg:px-8">
      <h1 className="heading2">Team Settings</h1>
      <hr />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <Suspense fallback={<SubscriptionSkeleton />}>
            <ManageSubscription />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={ <TeamMembersSkeleton /> }>
            <TeamMembers />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={ <InviteTeamMemberSkeleton /> }>
            <InviteTeamMember />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
