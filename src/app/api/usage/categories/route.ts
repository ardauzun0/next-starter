import { getUsageCategories } from '@/services/usage';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getUsageCategories();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Usage categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage categories' },
      { status: 500 }
    );
  }
}

