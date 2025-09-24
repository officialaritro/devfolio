'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { chatIdRegex, excludedPaths } from '@/lib/constants/path-names'

const GrainyFilter = () => {
  const pathname = usePathname()

  if (excludedPaths.includes(pathname) || chatIdRegex.test(pathname)) {
    return null
  }

  return (
    <svg className="pointer-events-none absolute cursor-none">
      <filter id="grainy">
        <feTurbulence type="turbulence" baseFrequency="0.5"></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
      </filter>
    </svg>
  )
}

export default GrainyFilter