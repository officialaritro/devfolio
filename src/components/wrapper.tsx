'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { delays } from '@/lib/constants/delays';

import { useIsFirstLoad } from '@/store/loading-store';

import Footer from './footer';
import Nav from './nav';
import SignatureLogo from './signature-logo';
import Toc from './toc';

import { TooltipProvider } from './ui/tooltip';

/* Commented out unused imports for disabled chatbot
import ChatbotHighlightProvider from '@/provider/chatbot-highlight';
import ChatBot from './chat-bot';
*/

const Wrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useIsFirstLoad();

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(wrapperRef.current, {
      opacity: 0,
      y: 110,
      delay: isFirstLoad ? delays['pre-loader-first-load'] : delays['pre-loader'],
    });

    t1.from('main > section', { opacity: 0, y: 16, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, '<0.15');
  }, { scope: wrapperRef });

  return (
    <TooltipProvider>
      <SignatureLogo delay={(isFirstLoad ? delays['pre-loader-first-load'] : delays['pre-loader']) + 0.3} />
      <Toc />
      {/* Disabled chatbot provider and component */}
      {/* 
        <ChatbotHighlightProvider>
          <main ref={wrapperRef} className="mx-auto max-w-3xl py-12 flex flex-col gap-6 px-4 text-white">
            <Nav />
            {children}
          </main>
          <ChatBot /> 
        </ChatbotHighlightProvider>
      */}
      <main ref={wrapperRef} className="mx-auto max-w-3xl py-12 flex flex-col gap-6 px-4 text-white">
        <Nav />
        {children}
        <Footer />
      </main>
    </TooltipProvider>
  )
}

export default Wrapper