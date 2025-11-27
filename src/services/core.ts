const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://frontend-example-panel.pentademo.com.tr/wp-json';

/**
 * Generic fetch wrapper for WordPress API
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: {
        revalidate: 3600,
        ...options?.next,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${url}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
