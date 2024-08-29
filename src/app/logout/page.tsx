"use client"; // This marks the component as a Client Component

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 2000);
  }, [router]);

  return (
    <div>Logging out...</div>
  );
}
