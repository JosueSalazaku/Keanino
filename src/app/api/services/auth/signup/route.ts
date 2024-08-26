"use server";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from 'next/server';
import { signupAction } from '../../auth/actions';

interface SignupRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const { email, password } = body as SignupRequestBody;

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await signupAction(body);

    if (result.error) {
      console.log('Signup error:', result.error.message);
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    } else {
      console.log('Signup successful');
      return NextResponse.redirect('/');
    }
  } catch (error) {
    console.error('Error in signup handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
