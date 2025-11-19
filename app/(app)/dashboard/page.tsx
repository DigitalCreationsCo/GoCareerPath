import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getTeamForUser, getActivityLogs } from '@/lib/db/queries/user';
import { TeamDataWithMembers, ActivityType } from '@/lib/types';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

type TeamSnapshot = {
  team_id: string;
  team_name: string;
  snapshot_date: string;
  skill_heatmap: { skillName: string; averageProficiency: number; }[];
  promotion_readiness: { employeeId: string; employeeName: string; readiness_score: number; }[];
  attrition_risk: { employeeId: string; employeeName: string; risk_score: number; }[];
};

async function getTeamSnapshot(teamId: string): Promise<TeamSnapshot> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams/${teamId}/snapshot`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch team snapshot');
  }
  return response.json();
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  if (session.user.role !== 'owner') {
    redirect('/chat');
  }

  // We'll need a way to get the user's team ID. For now, we'll hardcode it.
  const teamId = session.user.teamId;
  if (!teamId) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Error</h1>
        <p>User is not part of a team.</p>
      </div>
    );
  }
  const [ snapshot, teamData, logs ] = await Promise.all([
    getTeamSnapshot(teamId),
    getTeamForUser(),
    getActivityLogs()
  ]);

  const iconMap: Record<ActivityType, LucideIcon> = {
    [ ActivityType.SIGN_UP ]: UserPlus,
    [ ActivityType.SIGN_IN ]: UserCog,
    [ ActivityType.SIGN_OUT ]: LogOut,
    [ ActivityType.UPDATE_PASSWORD ]: Lock,
    [ ActivityType.DELETE_ACCOUNT ]: UserMinus,
    [ ActivityType.UPDATE_ACCOUNT ]: Settings,
    [ ActivityType.CREATE_TEAM ]: UserPlus,
    [ ActivityType.REMOVE_TEAM_MEMBER ]: UserMinus,
    [ ActivityType.INVITE_TEAM_MEMBER ]: Mail,
    [ ActivityType.ACCEPT_INVITATION ]: CheckCircle,
  };

  function getRelativeTime(date: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  }

  function formatAction(action: ActivityType): string {
    switch (action) {
      case ActivityType.SIGN_UP:
        return 'You signed up';
      case ActivityType.SIGN_IN:
        return 'You signed in';
      case ActivityType.SIGN_OUT:
        return 'You signed out';
      case ActivityType.UPDATE_PASSWORD:
        return 'You changed your password';
      case ActivityType.DELETE_ACCOUNT:
        return 'You deleted your account';
      case ActivityType.UPDATE_ACCOUNT:
        return 'You updated your account';
      case ActivityType.CREATE_TEAM:
        return 'You created a new team';
      case ActivityType.REMOVE_TEAM_MEMBER:
        return 'You removed a team member';
      case ActivityType.INVITE_TEAM_MEMBER:
        return 'You invited a team member';
      case ActivityType.ACCEPT_INVITATION:
        return 'You accepted an invitation';
      default:
        return 'Unknown action occurred';
    }
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Team Dashboard: { teamData?.name }</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <ul>
            { teamData?.users.map((user) => (
              <li key={ user.id }>
                { user.name || user.email } ({ user.role })
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Invitations</h2>
          <ul>
            { teamData?.invitations.map((invitation) => (
              <li key={ invitation.id }>
                { invitation.email } ({ invitation.status })
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Skill Heatmap</h2>
          <ul>
            { snapshot.skill_heatmap.map((skill) => (
              <li key={ skill.skillName }>
                { skill.skillName }: { skill.averageProficiency.toFixed(1) }
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Promotion Readiness</h2>
          <ul>
            { snapshot.promotion_readiness.map((employee) => (
              <li key={ employee.employeeId }>
                { employee.employeeName }: { (employee.readiness_score * 100).toFixed(0) }%
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Attrition Risk</h2>
          <ul>
            { snapshot.attrition_risk.map((employee) => (
              <li key={ employee.employeeId }>
                { employee.employeeName }: { (employee.risk_score * 100).toFixed(0) }%
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          { logs.length > 0 ? (
            <ul className="space-y-4">
              { logs.map((log) => {
                const Icon = iconMap[ log.action as ActivityType ] || Settings;
                const formattedAction = formatAction(
                  log.action as ActivityType
                );

                return (
                  <li key={ log.id } className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Icon className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        { formattedAction }
                        { log.ipAddress && ` from IP ${log.ipAddress}` }
                      </p>
                      <p className="text-sm text-gray-500">
                        { getRelativeTime(new Date(log.timestamp)) }
                      </p>
                    </div>
                  </li>
                );
              }) }
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 mb-4 text-warning" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No activity yet
              </h3>
              <p className="max-w-sm text-sm text-gray-500">
                When you perform actions like signing in or updating your
                account, they'll appear here.
              </p>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
