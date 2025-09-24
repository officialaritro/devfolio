"use client";

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useIsFirstLoad, useSetFirstLoad } from '@/store/loading-store';

const SmoothScroll = ({
  children
}: {
  children: React.ReactNode
}) => {
  const queryClient = new QueryClient()

  const countRef = useRef(0);
  const pathname = usePathname();

  const isFirstLoad = useIsFirstLoad();
  const setIsFirstLoad = useSetFirstLoad();

  useEffect(() => {
    if (countRef.current > 1 && isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      countRef.current += 1;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default SmoothScroll;