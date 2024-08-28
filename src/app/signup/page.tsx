/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Input } from '~/components/ui/input';
// import { Button } from '~/components/ui/button';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     try {
//       const res = await fetch('/api/services/auth/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (res.redirected) {
//         router.push(res.url);
//       } else {
//         const result: { error?: string } = await res.json();
  
//         if (result.error) {
//           if (result.error.includes('Email rate limit exceeded')) {
//             setError('Too many signup attempts. Please try again later.');
//           } else if (result.error.includes('Email already registered')) {
//             setError('This email is already registered. Please log in or use a different email.');
//           } else {
//             setError(result.error);
//           }
//         }
//       }
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError('An unexpected error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   return (
//     <div className='flex flex-col justify-center items-center pt-10 gap-12'>
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup} className='flex flex-col justify-between items-center gap-7'>
//         <Input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           className='w-[350px] gap-4'
//         />
//         <Input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           className='w-[350px] gap-4'
//         />
//         {error && <div className="text-red-500">{error}</div>}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Signing Up...' : 'Sign Up'}
//         </Button>
//       </form>
//     </div>
//   );
// }

import React from 'react'
import SingUpForm from './components/signUpForm';

export default function Sginup() {
  return (
    <div className='flex items-center justify-center pt-20'><SingUpForm/></div>
  )
}
