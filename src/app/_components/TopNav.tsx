"use client";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import type { User } from "~/types";
import axios from "axios";
import Image from 'next/image';


export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const { signOut } = useAuth();
  const { user } = useUser(); // Clerk user



  async function updateUserData(user: User): Promise<User | undefined> {
    try {
      const { id, username, imageUrl } = user;
      const response = await axios.put(`/api/users/${id}`, { username, imageUrl });
      return response.data as User;
    } catch (error) {
      console.error("Error updating user data:", error);
      return undefined;
    }
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-14">
      <Link href="/" className="font-didot text-3xl font-bold text-main">
        Keanino
      </Link>
      <button onClick={toggle} className="md:hidden text-white">
        {isOpen ? <HiOutlineX className="size-7" /> : <HiOutlineMenu className="size-7" />}
      </button>
      <div className="hidden md:flex flex-row items-center text-white space-x-6">
        <SignedIn>
          <Button className="bg-main font-bold text-primary">
            <Link href="/write">Write</Link>
          </Button>
          <Link href="/people">People</Link>
          <Link href="/places">Places</Link>
          <Link href="/pages">Pages</Link>
          <UserButton showName={true} defaultOpen={false} />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <button>Sign In</button>
          </Link>
          <Link href="/sign-up">
            <button>Sign Up</button>
          </Link>
        </SignedOut>
      </div>

      {isOpen && (
        <div className="absolute rounded-b-lg top-20 h-screen left-0 right-0 z-50 bg-orange-400 flex flex-col justify-evenly items-center text-6xl text-main md:hidden">
          <SignedIn>
            <div className="flex items-center space-x-4">
              {user?.imageUrl && (
                <Image
                  src={user?.imageUrl || '/default-profile.png'} 
                  alt="User Picture"
                  width={48}  
                  height={48} 
                  className="rounded-full"
                  />
              )}
              <span>{user?.username ?? "User"}</span>
            </div>
            <Link href="/write" onClick={closeMenu}>
              Write
            </Link>
            <Link href="/people" onClick={closeMenu}>
              People
            </Link>
            <Link href="/places" onClick={closeMenu}>
              Places
            </Link>
            <Link href="/pages" onClick={closeMenu}>
              Pages
            </Link>
            <button onClick={async () => { await signOut(); closeMenu(); }}>Sign Out</button>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <button onClick={closeMenu}>Sign In</button>
            </Link>
            <Link href="/sign-up">
              <button onClick={closeMenu}>Sign Up</button>
            </Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
