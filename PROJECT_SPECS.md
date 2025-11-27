````markdown
@workspace I need to refactor the project structure for better maintainability and readability before we start coding the pages. We are switching from a monolithic approach to a modular architecture.

Please perform the following tasks step by step:

### 1. Refactor Services (Modular API)
Instead of a single `api.ts`, split the logic into domain-specific service files in `src/services/`.
- **`src/services/core.ts`**: Keep the generic `fetchAPI` wrapper here.
- **`src/services/global.ts`**: Functions for Options (Menu, Footer, Settings) & SEO.
- **`src/services/blog.ts`**: Functions for Posts, Categories, Search.
- **`src/services/product.ts`**: Functions for Product Detail and Categories.
- **`src/services/page.ts`**: Functions for dynamic Page fetching.
- **`src/services/usage.ts`**: Functions for Usage Areas.
*Make sure all service files import the `fetchAPI` from `core.ts`.*

### 2. Refactor Types & Components (Co-location)
Instead of a giant `types/index.ts`, we want to keep specific types close to where they are used.
- **Shared Types:** Keep generic API responses (like `GlobalOptions`, `SEOData`) in `src/types/api.ts`.
- **Block Types:** Do **not** put block specific interfaces (like `HeroBlock`, `ImageContentBlock`) in the global types folder. Instead, define them inside their respective component files.

**Create the Block Component Structure:**
Create a folder `src/components/blocks/`. Inside, create placeholder components for the blocks we identified (e.g., `Hero`, `ImageContent`).
*Example Structure for `src/components/blocks/Hero.tsx`:*
```tsx
import { BaseBlock } from '@/types/api';

export interface HeroBlockProps extends BaseBlock {
  acf_fc_layout: 'hero';
  title: string;
  image: string;
  // ...other specific fields
}

export default function Hero({ title, image }: HeroBlockProps) {
  return (
    <section>
      {/* Implementation */}
    </section>
  );
}
````

### 3\. Block Renderer Logic

Create `src/components/blocks/BlockRenderer.tsx`.

  - This component should import all available blocks (Hero, ImageContent, etc.).
  - It should take a `content` prop (array of blocks).
  - It should loop through the content and render the correct component based on `acf_fc_layout`.

### 4\. App Router Structure

Create the file structure for the Next.js App Router based on our endpoints:

  - `src/app/blog/page.tsx` (List all posts)
  - `src/app/blog/[slug]/page.tsx` (Single post detail)
  - `src/app/products/[category]/page.tsx` (Product category list)
  - `src/app/products/detail/[slug]/page.tsx` (Product detail)
  - `src/app/[slug]/page.tsx` (Dynamic catch-all for Pages like "About Us")

**Instruction:**
Please generate the file structure and the code for:

1.  The split service files.
2.  The `BlockRenderer` and 2 example block components (Hero, ImageContent) with co-located types.
3.  The folder structure for `app/`.

<!-- end list -->

```