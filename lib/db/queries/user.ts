import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from '../drizzle';
import { activityLogs, teamMembers, teams, users } from '@/lib/db/schema';
import { NewUser, User, TeamDataWithMembers } from '@/lib/types';
import { hashPassword } from '@/lib/auth/session';
import { auth } from '@/auth';

export async function createUser(user: NewUser) {
  try {
    console.debug('createUser: ', user);
    let passwordHash = '';
    if (user.password) {
      passwordHash = await hashPassword(user.password);
    }
    const [ newUser ] = await db.insert(users).values({
      ...user,
      id: user.id,
      passwordHash,
      role: 'member'
    }).returning();

    console.debug('Created new user in database: ', newUser);

    return newUser;
  } catch (error) {
    console.error("Failed to create user in database: ", error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    return (await db.select().from(users).where(eq(users.id, id))).shift();
  } catch (error) {
    console.error("Failed to get user by email from database");
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    return (await db.select().from(users).where(eq(users.email, email))).shift();
  } catch (error) {
    console.error("Failed to get user by email from database");
    throw error;
  }
}

export async function getUser() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, session.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[ 0 ];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[ 0 ] : null;
}

export async function updateTeamSubscription(
  teamId: string,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date().toISOString()
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: string) {
  const result = await db
    .select({
      user: users,
      teamId: users.teamId,
      team: teams
    })
    .from(users)
    .leftJoin(teams, eq(users.teamId, teams.id))
    .where(eq(users.id, userId))
    .limit(1);

  return result[ 0 ];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser() {
  const user = await getUser();
  if (!user || !user.teamId) {
    return null;
  }

  const result = await db.query.teams.findFirst({
    where: eq(teams.id, user.teamId),
    with: {
      teamManagers: {
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      users: {
        columns: {
          id: true,
          name: true,
          email: true,
          role: true,
        }
      },
      invitations: {
        columns: {
          id: true,
          email: true,
          status: true,
          role: true,
        }
      }
    }
  });

  return result as unknown as TeamDataWithMembers;
}
