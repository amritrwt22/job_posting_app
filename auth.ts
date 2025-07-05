import NextAuth from "next-auth"; //authentication library for Next.js applications
import GitHub from "next-auth/providers/github"; //GitHub OAuth provider for NextAuth
import { PrismaAdapter } from "@auth/prisma-adapter"; //PrismaAdapter Connects NextAuth to your database via Prisma.
import { PrismaClient } from "./app/generated/prisma"; //The Prisma ORM client, generated from your schema.

const prisma = new PrismaClient();

//next-auth configuration
export const { auth, handlers, signIn, signOut } = NextAuth({
  // session configuration for NextAuth , jwt means JSON Web Tokens are used to manage sessions
  // In authentication, JWTs are often used to represent user identity and claims after login.
  session: {
    strategy: "jwt",
  },

  // Enables GitHub as a login method. Users can sign in with their GitHub accounts
  providers: [GitHub],

  // adapter configuration for NextAuth, PrismaAdapter is used to connect NextAuth with Prisma
  adapter: PrismaAdapter(prisma),
  
  //The callbacks object lets you customize what data is stored in the JWT and what is exposed in the session.
  //the async jwt and session callbacks are used to customize the JWT and session objects
  callbacks: {
    //Runs whenever a JWT is created or updated (e.g., after sign-in or when a session is accessed).
    //If a user just signed in, it adds the user’s id and name to the JWT token. This makes these values available in the token for future requests
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    //Runs whenever a session is checked or created (e.g., when you call useSession() or getServerSession()).
    //Takes the id and name from the JWT and adds them to the session object, making them available on the client side. This is useful for accessing user info in your frontend components
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});

/*
Feature                        What it Does
JWT Session                	Stores user session data in a signed token, not the database
GitHub Provider	            Lets users sign in with GitHub
PrismaAdapter	            Connects NextAuth to your database via Prisma ORM
jwt callback	            Adds user info (id, name) to the JWT after login
session callback	        Makes user info available in the session object sent to the client

This page configures authentication for your app, using GitHub for login, Prisma for database access, 
and custom callbacks to ensure user info is available in both the JWT and session objects
*/