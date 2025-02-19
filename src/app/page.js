"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import "../utils/home.css";

export default function Home() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;
    
    // Sign out from NextAuth first
    await signOut({ redirect: false });

    // Redirect user to Keycloak logout URL
    window.location.href = keycloakLogoutUrl;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {!session ? (
          <>
            <h2>Welcome to OIS AMENTUM WEB SOLUTION</h2>
            <p>
              For accessing the OIS AMENTUM WEB SOLUTION, you have to login first.
              Click the button below to log in to this platform.
            </p>
            <button className="login-btn" onClick={() => signIn("keycloak", { prompt: "login" })}>
              Login with Keycloak
            </button>
          </>
        ) : (
          <>
            <h2>Welcome, {session.user.name}!</h2>
            <p>You are successfully logged in to OIS AMENTUM WEB SOLUTION.</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
