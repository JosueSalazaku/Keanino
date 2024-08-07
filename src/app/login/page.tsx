// 'use client'
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const supabase = createClientComponentClient()
//   const handleSingUp = async () => {
//     await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo:`${location.origin}/auth/callback`
//       }
//     })
//     router.refresh();
//   }

//   const handleSingIn = async () => {
//     await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })
//     router.refresh();
//   }

//   return (
//     <div>Login</div>
//   )
// }

import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}

