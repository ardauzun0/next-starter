'use client';

import { BaseBlock } from '@/types/index.d';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export interface TabItem {
  title: string;
  exp: string;
  image: string;
}

export interface TabBlockProps extends BaseBlock {
  acf_fc_layout: 'tab';
  tabs: TabItem[];
}

export default function Tab({ tabs }: TabBlockProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeTabData = tabs[activeTab];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {tabs.map((tab, index) => (
            <button
              key={`tab-${index}-${tab.title}`}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === index
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {activeTabData && (
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {activeTabData.image && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={activeTabData.image}
                      alt={activeTabData.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                <div
                  className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80"
                  dangerouslySetInnerHTML={{ __html: activeTabData.exp }}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
