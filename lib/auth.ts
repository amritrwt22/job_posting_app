"use server";
import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};

/* explain this page 
This page provides server-side functions for user authentication in a Next.js application. It includes:
- `login`: A function that triggers the sign-in process using GitHub as the authentication provider. It redirects users to the home page after successful login.
- `logout`: A function that triggers the sign-out process and redirects users to the sign-in page after logging out.
These functions can be used in server components or API routes to manage user sessions effectively.
This setup allows you to easily integrate authentication into your Next.js application, enabling users to log in with GitHub and manage their sessions securely.
*/