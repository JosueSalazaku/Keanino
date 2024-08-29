/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import createClient from "util/supabase/supabaseClient";

export default function LoginButton() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error, 
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [supabase]);

  if (user) {
    return (
      <div>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
}
