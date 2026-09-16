import React from 'react'

import { cn } from '@/lib/utils'

const Pill = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-zinc-800 text-neutral-300 text-xs px-2.5 py-1 transition-colors hover:bg-zinc-700 hover:text-white',
        className
      )}
    >
      {children}
    </span>
  )
}

export default Pill
