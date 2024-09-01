"use client";

import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex items-center justify-center mt-8">
      <SignIn path="/sign-in" />
   </div>
  );
}
