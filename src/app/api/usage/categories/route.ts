import { getUsageCategories } from '@/services/usage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getUsageCategories();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Usage categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage categories' },
      { status: 500 }
    );
  }
}

