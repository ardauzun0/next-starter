/**
 * JSON-LD Component
 * Renders structured data (Schema.org) as a script tag in the page body
 */

interface JsonLdProps {
  data: any[] | any | null | undefined;
}

export default function JsonLd({ data }: JsonLdProps) {
  // Handle null, undefined, or empty data
  if (!data) {
    return null;
  }

  // If data is an array, stringify it; otherwise stringify the object
  const jsonLdData = Array.isArray(data) ? data : [data];

  // If array is empty, return null
  if (jsonLdData.length === 0) {
    return null;
  }

  // Stringify the JSON-LD data
  const jsonString = JSON.stringify(jsonLdData.length === 1 ? jsonLdData[0] : jsonLdData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

