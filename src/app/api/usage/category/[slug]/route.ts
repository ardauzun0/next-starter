import { getUsageAreasByCategory } from '@/services/usage';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getUsageAreasByCategory(slug);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Usage category error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage areas by category' },
      { status: 500 }
    );
  }
}

