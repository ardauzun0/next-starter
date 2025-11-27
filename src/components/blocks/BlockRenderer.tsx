import React from 'react';
import { BaseBlock } from '@/types/api';
import Hero from './Hero';
import ImageContent from './ImageContent';

// Map of ACF layout names to React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  image_content: ImageContent,
  // Add more block types as they are created
};

interface BlockRendererProps {
  blocks: BaseBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockMap[block.acf_fc_layout];

        if (!Component) {
          console.warn(
            `Unknown block type: ${block.acf_fc_layout}. Available types: ${Object.keys(blockMap).join(', ')}`
          );
          return null;
        }

        return (
          <Component
            key={`${block.acf_fc_layout}-${index}`}
            {...block}
          />
        );
      })}
    </>
  );
}

