import { getUsageAreas } from '@/services/usage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getUsageAreas();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Usage areas error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage areas' },
      { status: 500 }
    );
  }
}

