import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Pages() {
  return (
    <>
      <SignedIn>
        <h1>Welcome to Pages</h1>
        {/* Add your content here */}
      </SignedIn>
      <SignedOut>
        <p>Please <Link href="/sign-in">sign in</Link> to view this content.</p>
      </SignedOut>
    </>
  );
}
