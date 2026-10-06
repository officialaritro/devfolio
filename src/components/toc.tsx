'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  label: string;
  level: number;
}

// A section counts as "current" once its top passes this fraction of the viewport height.
const ACTIVE_LINE = 0.35;

const Toc = () => {
  const pathname = usePathname();

  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [beam, setBeam] = useState<{ top: number; height: number } | null>(null);

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const found = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'))
      .map((el) => ({ id: el.id, label: el.querySelector('h3')?.textContent?.trim() ?? '', level: Number(el.dataset.tocLevel ?? 0) }))
      .filter((item) => item.label);

    setItems(found);
    setActiveId(found[0]?.id ?? '');
  }, [pathname]);

  useEffect(() => {
    if (!items.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // A short last section never reaches the line, so pin it once the page bottoms out.
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveId(atBottom ? items[items.length - 1].id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  useEffect(() => {
    const el = itemRefs.current[activeId];
    setBeam(el ? { top: el.offsetTop, height: el.offsetHeight } : null);
  }, [activeId, items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label='On this page' className='fixed left-8 top-1/2 z-10 hidden w-48 -translate-y-1/2 xl:block'>
      <div className='relative flex flex-col pl-4'>
        <span className='absolute inset-y-0 left-0 w-px bg-white/10' />
        {beam && (
          <span
            aria-hidden
            className='absolute left-[-0.5px] w-0.5 rounded-full bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.55)] transition-[top,height] duration-300 ease-out motion-reduce:transition-none'
            style={{ top: beam.top, height: beam.height }}
          />
        )}

        {items.map((item) => (
          <button
            key={item.id}
            ref={(el) => { itemRefs.current[item.id] = el; }}
            type='button'
            style={{ paddingLeft: item.level * 12 }}
            aria-current={activeId === item.id ? 'true' : undefined}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={cn(
              'py-1.5 text-left text-sm transition-colors duration-200',
              activeId === item.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Toc;
