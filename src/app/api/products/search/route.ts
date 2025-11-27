import { searchProducts } from '@/services/product';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json(
      { success: false, error: 'Keyword is required' },
      { status: 400 }
    );
  }

  try {
    const data = await searchProducts(keyword);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}

