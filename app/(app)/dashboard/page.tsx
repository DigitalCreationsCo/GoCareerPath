import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getTeamForUser, getActivityLogs } from '@/lib/db/queries/user';
import { getLatestReportForUser } from '@/lib/db/queries/dashboard';
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
import { Card } from '@/components/ui/card';
import { ExpandableList } from '@/components/dashboard/expandable-list';
import { UserDashboard } from '@/components/dashboard/user-dashboard';

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

  // if (session.user.role !== 'owner') {
  //   redirect('/chat');
  // }

  if (session.user.role === 'owner') {
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

    const teamMemberItems = teamData?.users.map((user) => (
      <div key={user.id} className="flex items-center justify-between">
        <span className="font-medium">{ user.name || user.email }</span>
        <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">{ user.role }</span>
      </div>
    )) || [];

    const activityItems = logs.map((log) => {
      const Icon = iconMap[ log.action as ActivityType ] || Settings;
      const formattedAction = formatAction(log.action as ActivityType);
      return (
        <div key={log.id} className="flex items-start space-x-3">
          <div className="mt-1 p-1.5 bg-muted rounded-full shrink-0">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">
              { formattedAction }
            </p>
            <p className="text-xs text-muted-foreground">
              { getRelativeTime(new Date(log.timestamp)) }
            </p>
          </div>
        </div>
      );
    });

    const invitationItems = teamData?.invitations.map((invitation) => (
      <div key={ invitation.id } className="flex items-center justify-between p-2 text-sm rounded bg-muted/50">
        <span className="truncate">{ invitation.email }</span>
        <span className="text-xs capitalize text-muted-foreground">{ invitation.status }</span>
      </div>
    )) || [];

    return (
      <div className="container relative px-4 mx-auto space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl! heading2">{ teamData?.name }</h1>
          <h2 className="subtitle">Team Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Column 1: Lists */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-4">
              <h2 className="mb-4 text-lg font-semibold">Team Members</h2>
              <ExpandableList
                items={teamMemberItems}
                />
            </Card>

            <Card className="p-4">
              <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
              <ExpandableList
                items={activityItems}
                />
            </Card>

            <Card className="p-4">
              <h2 className="mb-4 text-lg font-semibold">Pending Invitations</h2>
              <ExpandableList
                items={ invitationItems }
                emptyText='No pending invitations.'
              />
            </Card>
          </div>

          {/* Columns 2 & 3: Data Cards */}
          <div className="grid content-start grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
            <Card className="p-6 border shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Skill Heatmap</h2>
              {snapshot.skill_heatmap.length > 0 ? (
                <div className="space-y-3">
                  { snapshot.skill_heatmap.map((skill) => (
                    <div key={ skill.skillName }>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{ skill.skillName }</span>
                        <span className="font-medium">{ skill.averageProficiency.toFixed(1) }/5</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full bg-blue-primary rounded-full" 
                          style={{ width: `${(skill.averageProficiency / 5) * 100}%` }} 
                        />
                      </div>
                    </div>
                  )) }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground">No skill data available.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Employees need to complete skill assessments via chat.</p>
                </div>
              )}
            </Card>

            <Card className="p-6 border shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Promotion Readiness</h2>
              {snapshot.promotion_readiness.length > 0 ? (
                <ul className="space-y-3">
                  { snapshot.promotion_readiness.map((employee) => (
                    <li key={ employee.employeeId } className="flex items-center justify-between">
                      <span className="text-sm">{ employee.employeeName }</span>
                      <span className="text-sm font-bold text-green-600">
                        { (employee.readiness_score * 100).toFixed(0) }%
                      </span>
                    </li>
                  )) }
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground">No readiness data available.</p>
                </div>
              )}
            </Card>

            <Card className="p-6 border shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Attrition Risk</h2>
              {snapshot.attrition_risk.length > 0 ? (
                <ul className="space-y-3">
                  { snapshot.attrition_risk.map((employee) => (
                    <li key={ employee.employeeId } className="flex items-center justify-between">
                      <span className="text-sm">{ employee.employeeName }</span>
                      <span className="text-sm font-bold text-red-600">
                        { (employee.risk_score * 100).toFixed(0) }%
                      </span>
                    </li>
                  )) }
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground">No high risk employees detected.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    const report = await getLatestReportForUser(session.user.id!);
    return (
      <div className="container relative px-4 mx-auto space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl! heading2">Your Dashboard</h1>
          <h2 className="subtitle">Career Insights</h2>
        </div>
        <UserDashboard report={report} />
      </div>
    )
  }
}
