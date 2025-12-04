'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { teams, users, teamManagers, teamMembers } from '@/lib/db/schema';
import { validatedActionWithUser } from '@/lib/auth/middleware';
import { getUserWithTeam } from '@/lib/db/queries/user';

const updateTeamSchema = z.object({
  teamName: z.string().min(1, 'Team name is required')
});

export const updateTeam = validatedActionWithUser(
  updateTeamSchema,
  async (data, _, user) => {
    const { teamName } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam) {
      return { error: 'User not found' };
    }

    if (userWithTeam.teamId) {
      await db
        .update(teams)
        .set({ name: teamName })
        .where(eq(teams.id, userWithTeam.teamId));
      
      return { success: 'Team updated successfully' };
    } else {
      // Create new team
      const [newTeam] = await db.insert(teams).values({
        name: teamName,
      }).returning();

      if (!newTeam) {
        return { error: 'Failed to create team' };
      }

      // Update user with teamId and role='owner'
      await db.update(users)
        .set({ 
          teamId: newTeam.id,
          role: 'owner' 
        })
        .where(eq(users.id, user.id));

      // Add user as team manager
      await db.insert(teamManagers).values({
        userId: user.id,
        teamId: newTeam.id,
      });

      // Add user as team member
      await db.insert(teamMembers).values({
        userId: user.id,
        teamId: newTeam.id,
        role: 'owner'
      });

      return { success: 'Team created successfully' };
    }
  }
);
