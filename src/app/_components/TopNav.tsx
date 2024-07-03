/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'

export function TopNav() {
  return (
    <nav className='flex w-full items-center justify-between border'>
          <div>Kelly's Blog</div>
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

