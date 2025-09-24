'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/constants/nav-items';
import { socialItems } from '@/lib/constants/social-items';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Nav = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="flex md:justify-between justify-around items-center">
        <div className='flex gap-4'>
          {navItems.map((item, idx) => (
            <Link href={item.link} key={idx}>
              <Button className={cn(
                'bg-zinc-800 border-none outline-none md:px-4 px-2',
                pathname === item.link && "bg-accent text-accent-foreground"
              )}
                variant="outline"
              >
                <item.icon size={20} />
                <span>{item.heading}</span>
              </Button>
            </Link>
          ))}
        </div>

        <div className='flex gap-4'>
          {socialItems.map((item, idx) => (
            <Link href={item.link} target='_blank' key={idx}>
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <item.icon size={25} className='rounded-md hover:scale-110 scale-100 transition duration-75 ease-in-out' />
                </TooltipTrigger>
                <TooltipContent>
                  <p className='p-2 bg-gray-500 text-white rounded'>{item.heading}</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Nav