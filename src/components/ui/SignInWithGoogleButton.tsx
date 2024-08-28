"use client";
import SignInWithGoogle from "~/lib/auth-actions";
import { Button } from "./button";

export default function SignInWithGoogleButton() {
  return (
    <Button
      type="button"
      variant={"outline"}
      className="w-full"
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        SignInWithGoogle();
      }}
    >
      Login with Google
    </Button>
  );
}
