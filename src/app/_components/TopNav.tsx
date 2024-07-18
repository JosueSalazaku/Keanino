import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function TopNav() {
  return (
<nav className='flex w-full h-20 px-5 items-center bg-primary justify-between'>
<Link href="/" className='text-2xl text-main font-bold font-didot'>
   Keanino
</Link>
    <div className='flex flex-row space-x-6 items-center'> {/* Ensure this div aligns its children vertically in the center */}
        <SignedOut>
            <SignInButton className="text-main font-bold" />
        </SignedOut>
        <SignedIn>
            <section className='flex flex-row space-x-5 text-main font-semibold items-center'> {/* Apply items-center here if necessary */}
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

