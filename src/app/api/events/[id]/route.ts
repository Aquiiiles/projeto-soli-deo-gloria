import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { EventCategory } from '@/generated/prisma/client';

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
    category: event.category.toLowerCase(),
  };
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });
    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(serializeEvent(event));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data: any = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.nameEn !== undefined) data.nameEn = body.nameEn;
    if (body.subtitle !== undefined) data.subtitle = body.subtitle;
    if (body.subtitleEn !== undefined) data.subtitleEn = body.subtitleEn;
    if (body.date !== undefined) data.date = new Date(body.date);
    if (body.endDate !== undefined) data.endDate = body.endDate ? new Date(body.endDate) : null;
    if (body.time !== undefined) data.time = body.time;
    if (body.category !== undefined) data.category = mapCategoryToDb(body.category);
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.spots !== undefined) data.spots = Number(body.spots);
    if (body.spotsLeft !== undefined) data.spotsLeft = Number(body.spotsLeft);
    if (body.location !== undefined) data.location = body.location;
    if (body.description !== undefined) data.description = body.description;
    if (body.descriptionEn !== undefined) data.descriptionEn = body.descriptionEn;
    if (body.image !== undefined) data.image = body.image;

    const event = await prisma.event.update({ where: { id: Number(id) }, data });
    return NextResponse.json(serializeEvent(event));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.event.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
