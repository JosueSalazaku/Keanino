import { loginAction, signupAction } from "../../api/services/auth/actions";

export default function login() {
  return (
    <form className="mt-5 flex flex-col items-center font-didot text-2xl">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="rounded-l border-2 border-primary"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="rounded-l border-2 border-primary"
      />
      <button formAction={loginAction}>Log in</button>
      <button formAction={signupAction}>Sign up</button>
    </form>
  );
}
