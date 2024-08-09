import { loginAction } from '../../services/auth/actions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await loginAction(new FormData(req.body as HTMLFormElement))
    res.redirect('/')
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
