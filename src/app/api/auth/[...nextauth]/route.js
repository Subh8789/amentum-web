import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    providers: [
      KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        issuer: process.env.KEYCLOAK_ISSUER,
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
