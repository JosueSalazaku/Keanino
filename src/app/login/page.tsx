"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, FormItem, FormLabel, FormField, FormMessage } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/services/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.redirected) {
      router.push(res.url)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center pt-10 gap-12'>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col justify-between items-center gap-7'>
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
