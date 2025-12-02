import { BaseBlock } from '@/types/index.d';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface IconItem {
  icon: string;
  title: string;
}

export interface FeatureHighlightBlockProps extends BaseBlock {
  acf_fc_layout: 'featurehighlight';
  title: string;
  exp_1: string;
  image: string;
  icons: IconItem[];
  exp_2: string;
}

export default function FeatureHighlight({
  title,
  exp_1,
  image,
  icons,
  exp_2,
}: FeatureHighlightBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{title}</h2>
          {exp_1 && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {exp_1}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {image && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {icons && icons.length > 0 && (
            <div className="space-y-6">
              {icons.map((icon, index) => (
                <Card key={`icon-${index}-${icon.title}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {icon.icon && (
                        <div className="relative w-12 h-12 shrink-0">
                          <Image
                            src={icon.icon}
                            alt={icon.title}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl">{icon.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

        {exp_2 && (
          <Card>
            <CardContent className="pt-6">
              <div
                className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80"
                dangerouslySetInnerHTML={{ __html: exp_2 }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
