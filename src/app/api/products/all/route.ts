import { getAllProducts } from '@/services/product';
import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  try {
    const data = await getAllProducts(perPage, page);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

