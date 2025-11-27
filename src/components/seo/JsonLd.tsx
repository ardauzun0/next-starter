interface JsonLdProps {
  data: any[] | any | null | undefined;
}

export default function JsonLd({ data }: JsonLdProps) {
  if (!data) {
    return null;
  }

  const jsonLdData = Array.isArray(data) ? data : [data];

  if (jsonLdData.length === 0) {
    return null;
  }

  const jsonString = JSON.stringify(jsonLdData.length === 1 ? jsonLdData[0] : jsonLdData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
