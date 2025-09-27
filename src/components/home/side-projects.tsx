import React from 'react';

import Link from 'next/link';

import { sideProjects } from '@/lib/constants/side-projects';

{/* import ChatBotProject from './chat-bot-project'; */}

import { ExternalLink, Info } from 'lucide-react';
import { GoDotFill } from "react-icons/go";
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const SideProjectsSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <h3 className='text-xl font-bold'>Side Projects</h3>

        <ul className="flex flex-col gap-4">
          {sideProjects.slice(0, 1).map((item, idx) => (
            <li className='text-neutral-500 flex w-full gap-4 items-start justify-between' key={idx}>
              <div className='flex flex-col gap-2 flex-1'>
                <div className='flex gap-2 items-center flex-wrap'>
                  <p className='text-white'>
                    {idx + 1}{"."}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.projLink}
                      className='text-white underline capitalize hover:text-neutral-300 transition-colors'
                      target="_blank"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <div>
                            {item.title}
                            <ExternalLink className="inline-block ml-1 w-3 h-3" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='p-2 bg-gray-500 text-white rounded'>View project</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>

                    <Link
                      href={item.descLink}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='p-2 bg-gray-500 text-white rounded'>View project details</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
                <p className='text-neutral-400 break-words ml-4'>
                  {item.desc}
                </p>
              </div>

              <div className='flex gap-2 items-center shrink-0'>
                {item.userCount &&
                  <p>{item.userCount}</p>
                }

                {item.activelyWorking && (
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='p-2 bg-gray-500 text-white rounded'>Actively working on it</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </li>
          ))}

          {/* <ChatBotProject /> */}

          {sideProjects.slice(1, sideProjects.length).map((item, idx) => (
            <li className='text-neutral-500 flex w-full gap-4 items-start justify-between' key={idx}>
              <div className='flex flex-col gap-2 flex-1'>
                <div className='flex gap-2 items-center flex-wrap'>
                  <p className='text-white'>
                    {idx + 3}{"."}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.projLink}
                      className='text-white underline capitalize hover:text-neutral-300 transition-colors'
                      target="_blank"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <div>
                            {item.title}
                            <ExternalLink className="inline-block ml-1 w-3 h-3" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='p-2 bg-gray-500 text-white rounded'>View project</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>

                    <Link
                      href={item.descLink}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='p-2 bg-gray-500 text-white rounded'>View project details</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
                <p className='text-neutral-400 break-words ml-4'>
                  {item.desc}
                </p>
              </div>

              <div className='flex gap-2 items-center shrink-0'>
                {item.userCount &&
                  <p>{item.userCount}</p>
                }

                {item.activelyWorking && (
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='p-2 bg-gray-500 text-white rounded'>Actively working on it</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SideProjectsSection