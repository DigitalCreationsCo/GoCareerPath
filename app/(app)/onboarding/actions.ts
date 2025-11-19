'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { teams } from '@/lib/db/schema';
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

    if (!userWithTeam?.teamId) {
      return { error: 'User is not part of a team' };
    }

    await db
      .update(teams)
      .set({ name: teamName })
      .where(eq(teams.id, userWithTeam.teamId));

    return { success: 'Team updated successfully' };
  }
);
