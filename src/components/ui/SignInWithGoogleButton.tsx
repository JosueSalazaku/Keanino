"use client";

import SignInWithGoogle from "~/lib/auth-actions";
import { Button } from "./button";

export default function SignInWithGoogleButton() {
  const handleSignIn = async () => {
    try {
      await SignInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleSignIn}
    >
      Login with Google
    </Button>
  );
}
