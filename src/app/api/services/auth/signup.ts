import { signupAction } from '../auth/actions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body as { email: string, password: string };

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await signupAction(formData);

      if (result?.error) {
       res.status(400).json({ error: result.error.message });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error in signup handler:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
