'use client'

import React from 'react'

import { SessionProvider } from 'next-auth/react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AdminLayout