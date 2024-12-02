"use client";
import { useState, useRef, useEffect } from "react";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoBookmark, GoPerson } from "react-icons/go";
import Image from "next/image";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const { signOut } = useAuth();
  const { user } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-transparant px-5">
      {/* Logo */}
      <Link href="/" className="font-didot text-3xl font-bold text-white">
        Keanino
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={toggle} className="text-white md:hidden">
        {isOpen ? <HiOutlineX className="w-7 h-7" /> : <HiOutlineMenu className="w-7 h-7" />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <SignedIn>
          <Link href="/write" className="bg-white text-primary px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            Write
          </Link>
          <Link href="/people" className="text-white hover:text-gray-300 transition">People</Link>
          <Link href="/places" className="text-white hover:text-gray-300 transition">Places</Link>
          <Link href="/books-pages" className="text-white hover:text-gray-300 transition">Pages</Link>

          <div className="relative flex items-center space-x-4">
            {user?.imageUrl && (
              <Image
                src={user.imageUrl}
                alt="User Picture"
                width={48}
                height={48}
                className="rounded-full cursor-pointer hover:ring-4 hover:ring-white"
                onClick={toggle}
              />
            )}
            {isOpen && (
              <div
                ref={menuRef}
                className="absolute top-14 right-0 bg-white rounded-lg shadow-lg p-4 w-56 space-y-4"
              >
                <Link href="/profile" className="flex items-center space-x-2 hover:text-primary">
                  <GoPerson /> <span>Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center space-x-2 hover:text-primary">
                  <IoSettingsOutline /> <span>Settings</span>
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    closeMenu();
                  }}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                >
                  <RiLogoutBoxRLine />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="text-white px-4 py-2 border-2 rounded hover:bg-main hover:text-primary transition">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-white px-4 py-2 border-2 rounded hover:bg-main hover:text-primary transition">
            Sign Up
          </Link>
        </SignedOut>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute top-20 text-2xl left-0 right-0 z-50 flex flex-col items-center bg-white p-6 shadow-lg space-y-6 md:hidden"
        >
          <SignedIn>
            <div className="flex items-center space-x-4">
              {user?.imageUrl && (
                <Image
                  src={user.imageUrl}
                  alt="User Picture"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
                <span className="font-bold">{user?.username ?? "User"}</span>
              </div>
              <Link href="/write" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                Write
              </Link>
              <Link href="/people" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                People
              </Link>
              <Link href="/places" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                Places
              </Link>
              <Link href="/books-pages" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                Pages
              </Link>
              <button
                onClick={async () => {
                await signOut();
                closeMenu();
                }}
                className="text-red-500 hover:text-red-700 hover:underline hover:text-lg"
              >
                Sign Out
              </button>
              </SignedIn>
              <SignedOut>
              <Link href="/sign-in" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                Sign In
              </Link>
              <Link href="/sign-up" onClick={closeMenu} className="text-primary hover:text-gray-500 hover:underline hover:text-3xl">
                Sign Up
              </Link>
              </SignedOut>
        </div>
      )}
    </nav>
  );
}
