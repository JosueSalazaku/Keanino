/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'

export function TopNav() {
  return (
    <nav className='flex w-full h-20 px-5 items-center justify-between border'>
          <div className='text-2xl font-bold font-didot'>Keanino</div>
          <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
          </div>
    </nav>
  )
}

export default TopNav