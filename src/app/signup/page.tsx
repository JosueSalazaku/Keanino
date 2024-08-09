"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/services/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.redirected) {
      router.push(res.url)
    } else {
      interface ResponseData {
        error: string | null;
        // Add other properties if necessary
      }
      
      const result: ResponseData = await res.json() as ResponseData;
      if (result.error) {
        console.error(result.error)
        // Optionally show an error message to the user
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center pt-10 gap-12'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} className='flex flex-col justify-between items-center gap-7'>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className='w-[350px] gap-4'
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className='w-[350px] gap-4'
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
