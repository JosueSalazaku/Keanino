import { signupAction } from '../../services/auth/actions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface RequestBody {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as RequestBody

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    await signupAction(formData)
    res.redirect('/')
  } else {
    res.status(405).end() // Method Not Allowed
  }
}