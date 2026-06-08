import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { RegistrationStatus } from '@/generated/prisma/client';

function mapStatusFromDb(status: RegistrationStatus): string {
  return status.toLowerCase();
}

function serializeRegistration(reg: any) {
  return {
    ...reg,
    status: mapStatusFromDb(reg.status),
    date: reg.createdAt.toISOString().split('T')[0],
  };
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
      include: { event: { select: { name: true, nameEn: true } } },
    });
    return NextResponse.json(registrations.map(serializeRegistration));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create registration and decrease spots atomically
    const [registration] = await prisma.$transaction([
      prisma.registration.create({
        data: {
          eventId: Number(body.eventId),
          name: body.name,
          email: body.email,
          phone: body.phone,
          church: body.church || '',
          age: body.age || '',
          notes: body.notes || '',
          status: RegistrationStatus.PENDING,
          paymentId: body.paymentId || null,
        },
      }),
      prisma.event.update({
        where: { id: Number(body.eventId) },
        data: { spotsLeft: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json(serializeRegistration(registration), { status: 201 });
  } catch (error) {
    console.error('Failed to create registration:', error);
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}
