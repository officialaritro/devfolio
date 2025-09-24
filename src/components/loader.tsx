'use client';

import React, { useRef } from 'react';

import { usePathname } from 'next/navigation';

import { useGSAP, } from '@gsap/react';
import gsap from 'gsap';

import { chatIdRegex, excludedPaths } from '@/lib/constants/path-names';
import { matchPath } from '@/lib/utils';

const Loader = ({ isFirstLoad }: { isFirstLoad: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (excludedPaths.includes(pathname) || chatIdRegex.test(pathname)) {
      return
    }

    const t1 = gsap.timeline();

    if (!isFirstLoad) {
      t1.from(containerRef.current, {
        ease: 'power1.inOut',
        y: '100vh',
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
        duration: 0.5,
      });
    }

    t1.from('.text-reveal', {
      y: isFirstLoad ? 100 : 50,
      duration: 0.3,
      autoAlpha: 0,
    })

    t1.to(containerRef.current, {
      ease: 'power1.inOut',
      y: '-100vh',
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%',
      delay: 0.5,
      duration: 0.5
    });

  }, { scope: containerRef, dependencies: [isFirstLoad] });

  if (excludedPaths.includes(pathname) || chatIdRegex.test(pathname)) {
    return null
  }

  return (
    <section
      ref={containerRef}
      className='fixed top-0 left-0 bg-black flex h-svh w-screen items-center justify-center font-bold leading-[115%] z-[999999] text-white'
    >
      <div className="z-50 flex flex-col items-center">
        <span className={`${isFirstLoad ? "overflow-hidden" : ""}`}>
          <span className={`flex text-reveal text-3xl ${isFirstLoad ? "invisible" : ''}`}>
            {matchPath(pathname, isFirstLoad)}
          </span>
        </span>

        {isFirstLoad && pathname === "/" &&
          <span className="overflow-hidden">
            <span className="flex text-reveal text-lg invisible">{`<Software Engineer />`}</span>
          </span>
        }
      </div>
    </section>
  );
};

export default Loader;