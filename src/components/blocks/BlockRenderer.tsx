import React from 'react';
import { BaseBlock } from '@/types/api';
import Hero from './Hero';
import ImageContent from './ImageContent';
import Breadcrumb from './Breadcrumb';
import Tab from './Tab';
import ImageList from './ImageList';
import Map from './Map';
import Gallery from './Gallery';
import FeatureHighlight from './FeatureHighlight';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  imagecontent: ImageContent,
  breadcrumb: Breadcrumb,
  tab: Tab,
  imagelist: ImageList,
  map: Map,
  gallery: Gallery,
  featurehighlight: FeatureHighlight,
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
        const layoutKey = block.acf_fc_layout;
        const Component = blockMap[layoutKey];

        if (!Component) {
          console.warn(
            `Unknown block type: ${layoutKey}. Available types: ${Object.keys(blockMap).join(', ')}`
          );
          return null;
        }

        return (
          <Component
            key={`${layoutKey}-${index}`}
            {...block}
            acf_fc_layout={layoutKey}
          />
        );
      })}
    </>
  );
}
