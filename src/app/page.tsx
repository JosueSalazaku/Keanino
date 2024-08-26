"use client"
import { useEffect } from 'react';
import Link from "next/link";
import createClient from '../../util/supabase/supabaseClient';

export default function HomePage() {
  useEffect(() => {
    const client = createClient(); // Call the createClient function
    console.log(client); // Log the actual Supabase client object
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-primary text-white">
      <section className="">
        
      </section>
      <section>
        
      </section>
      The 3 P
    </main>
  );
}

