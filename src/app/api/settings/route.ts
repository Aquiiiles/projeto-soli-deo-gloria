import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data: any = {};
    if (body.projectName !== undefined) data.projectName = body.projectName;
    if (body.contactEmail !== undefined) data.contactEmail = body.contactEmail;
    if (body.pixKey !== undefined) data.pixKey = body.pixKey;
    if (body.whatsapp !== undefined) data.whatsapp = body.whatsapp;
    if (body.address !== undefined) data.address = body.address;

    const settings = await prisma.settings.update({
      where: { id: 1 },
      data,
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
