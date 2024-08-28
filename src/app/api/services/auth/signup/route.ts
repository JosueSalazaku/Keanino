// "use server";

// import { NextResponse } from 'next/server';
// import { signupAction } from '../../auth/actions';

// export async function POST(request: Request) {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const body = await request.json();
//     console.log('Received body:', body);

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//     const result = await signupAction(body);

//     if (result.error) {
//       console.log('Signup error:', result.error.message);
//       return NextResponse.json({ error: result.error.message }, { status: 400 });
//     }

//     console.log('Signup successful');
//     // Handle the redirect after a successful signup
//     return NextResponse.redirect(new URL('/', request.url));

//   } catch (error) {
//     console.error('Error in signup handler:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

