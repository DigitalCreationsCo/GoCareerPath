import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { snapshots } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
  try {
    const userId = (await params).id;
    const employeeSnapshots = await db.select().from(snapshots).where(eq(snapshots.userId, userId));

    if (employeeSnapshots.length === 0) {
      return NextResponse.json({ message: 'No snapshots found for this employee' }, { status: 404 });
    }

    return NextResponse.json(employeeSnapshots);
  } catch (error) {
    console.error('Error fetching snapshots:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
  try {
    const userId = (await params).id;
    const body = await request.json();

    const newSnapshot = await db.insert(snapshots).values({
      ...body,
      userId,
    }).returning();

    return NextResponse.json(newSnapshot[ 0 ], { status: 201 });
  } catch (error) {
    console.error('Error creating snapshot:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
