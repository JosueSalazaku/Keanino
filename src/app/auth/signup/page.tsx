/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: formData,
    })

    if (res.redirected) {
      router.push(res.url)
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
