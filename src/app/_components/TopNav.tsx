/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function TopNav() {
  return (
    <nav className='flex w-full h-20 px-5 items-center bg-primary justify-between border'>
          <div className='text-2xl text-main font-bold font-didot'>Keanino</div>
          <div className='flex flex-row space-x-6'>
              <SignedOut>
                <SignInButton />
              </SignedOut>
        <SignedIn>
          <section className='flex flex-row space-x-5'>
          <Link href="/People">People</Link>
          <Link href="/Places">Places</Link>
          <Link href="/Pages">Pages</Link>
          </section>
                <UserButton />
              </SignedIn>
          </div>
    </nav>
  )
}

export default TopNav