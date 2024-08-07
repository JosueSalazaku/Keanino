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

import { login, signup } from '../login/actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col font-didot text-2xl items-center mt-5'>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required className='border-2 border-primary rounded-l' />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required className='border-2 border-primary rounded-l' />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}

