import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { EventCategory } from '@/generated/prisma/client';

function mapCategoryFromDb(cat: EventCategory): string {
  return cat.toLowerCase();
}

function mapCategoryToDb(cat: string): EventCategory {
  const map: Record<string, EventCategory> = {
    conference: EventCategory.CONFERENCE,
    camp: EventCategory.CAMP,
    workshop: EventCategory.WORKSHOP,
    cafe: EventCategory.CAFE,
  };
  return map[cat] || EventCategory.CONFERENCE;
}

function serializeEvent(event: any) {
  return {
    ...event,
    date: event.date.toISOString().split('T')[0],
    endDate: event.endDate ? event.endDate.toISOString().split('T')[0] : event.date.toISOString().split('T')[0],
    category: mapCategoryFromDb(event.category),
  };
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: { _count: { select: { registrations: true } } },
    });
    return NextResponse.json(events.map(serializeEvent));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        name: body.name,
        nameEn: body.nameEn || '',
        subtitle: body.subtitle || '',
        subtitleEn: body.subtitleEn || '',
        date: new Date(body.date),
        endDate: body.endDate ? new Date(body.endDate) : null,
        time: body.time || '08:00',
        category: mapCategoryToDb(body.category),
        price: Number(body.price) || 0,
        spots: Number(body.spots) || 50,
        spotsLeft: Number(body.spotsLeft ?? body.spots) || 50,
        location: body.location || '',
        description: body.description || '',
        descriptionEn: body.descriptionEn || '',
        image: body.image || null,
      },
    });
    return NextResponse.json(serializeEvent(event), { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
