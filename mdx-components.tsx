import type { MDXComponents } from "mdx/types";
import { PullQuote } from "@/components/typography/pull-quote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PullQuote,
    ...components
  };
}
