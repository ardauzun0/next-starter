import { BaseBlock } from '@/types/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface CountryItem {
  country: string;
  name: string;
}

export interface MapBlockProps extends BaseBlock {
  acf_fc_layout: 'map';
  title: string;
  exp: string;
  countries: CountryItem[];
}

export default function Map({ title, exp, countries }: MapBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{title}</CardTitle>
            {exp && <CardDescription className="text-base">{exp}</CardDescription>}
          </CardHeader>
          <CardContent>
            {countries && countries.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                {countries.map((country, index) => (
                  <div
                    key={`country-${index}-${country.name}`}
                    className="px-4 py-3 bg-muted rounded-lg text-center hover:bg-accent transition-colors"
                  >
                    <div className="font-medium text-foreground">{country.name}</div>
                    {country.country && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {country.country}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
