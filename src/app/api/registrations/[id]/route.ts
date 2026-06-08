import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { RegistrationStatus } from '@/generated/prisma/client';

function mapStatusToDb(status: string): RegistrationStatus {
  const map: Record<string, RegistrationStatus> = {
    confirmed: RegistrationStatus.CONFIRMED,
    pending: RegistrationStatus.PENDING,
    cancelled: RegistrationStatus.CANCELLED,
  };
  return map[status] || RegistrationStatus.PENDING;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const registration = await prisma.registration.update({
      where: { id: Number(id) },
      data: { status: mapStatusToDb(body.status) },
    });
    return NextResponse.json({
      ...registration,
      status: registration.status.toLowerCase(),
      date: registration.createdAt.toISOString().split('T')[0],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}
