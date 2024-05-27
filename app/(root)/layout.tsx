import UnAuth from '@/components/UnAuth'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <main>
      <SignedOut>
        <UnAuth/>
      </SignedOut>
      <SignedIn>
      {children}
      </SignedIn>
    </main>
  )
}

export default Layout