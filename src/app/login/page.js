"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => signIn("keycloak")}>Sign in with Keycloak</button>
    </div>
  );
}
