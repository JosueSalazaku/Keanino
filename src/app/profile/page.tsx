"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main text-primary p-6">
      {user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt={user.username ?? "User Profile"}
          width={150}
          height={150}
          className="rounded-full mb-4 shadow-lg"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.username ?? "User"}!
      </h1>
      <p className="text-lg">We&apos;re glad to have you here!</p>
    </div>
  );
}

export default ProfilePage;
