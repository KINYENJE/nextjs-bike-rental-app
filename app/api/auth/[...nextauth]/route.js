import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token}) {
      session.user.id = token.sub; // Add user ID to session
      return session;
    }
  }
});

export { handler as GET, handler as POST }; // Export both GET and POST methods for Next.js API routes