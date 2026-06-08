import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data: any = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.role !== undefined) data.role = body.role;
    if (body.roleEn !== undefined) data.roleEn = body.roleEn;
    if (body.bio !== undefined) data.bio = body.bio;
    if (body.bioEn !== undefined) data.bioEn = body.bioEn;
    if (body.image !== undefined) data.image = body.image;
    if (body.order !== undefined) data.order = Number(body.order);

    const member = await prisma.teamMember.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
