declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "mdx/types";

  export const frontmatter: Record<string, unknown>;

  const MDXComponent: ComponentType<{ components?: MDXComponents }>;
  export default MDXComponent;
}
