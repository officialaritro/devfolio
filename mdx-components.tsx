import { ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="text-2xl font-bold" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-xl" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-lg" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-base" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-neutral-400" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="flex list-disc ml-4 flex-col gap-2" {...props} />
  ),
  li: (props: ListItemProps) => <li className="text-neutral-400" {...props} />,
  a: ({ href, children, ...props }: AnchorProps) => {
    return (
      <Link
        href={href || "/"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white relative overflow-hidden"
        {...props}
      >
        <span className='hover-animation'>{children}</span>
      </Link>
    );
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function SubSection({ children, title }: { children: React.ReactNode, title: string }) {
  return <section>
    <div className='flex flex-col gap-2'>
      <h2 className="text-xl">{title}</h2>

      {children}
    </div>
  </section>
}

export function useMDXComponents(otherComponens: MDXComponents) {
  return {
    ...components,
    ...otherComponens,
    SubSection,
  }
}