"use client";

import { SessionProvider as Provider } from "next-auth/react";

// Define the Props type for this component
type Props = {
  children: React.ReactNode; // The React components that will be wrapped by the provider
  session: any;              // The session object containing user authentication data
};

// Export a custom SessionProvider component
export default function SessionProvider({ children, session }: Props) {
  // Wrap all child components with the Provider, passing the session prop
  // This makes authentication/session data available throughout the app via context
  return <Provider session={session}>{children}</Provider>;
}


/*EXPLANATION:

- "use client"; 
  This directive tells Next.js that this file is a Client Component, allowing it to use hooks and browser APIs.

What Does SessionProvider Do with JWT Strategy?
-SessionProvider is a React context provider from NextAuth that makes the user's authentication state 
(the "session") available throughout your React component tree.

-With JWT strategy, the session data is not stored on your server or in a database—
it's encoded in a JWT, which is stored in a cookie on the client.

When your app needs to know if a user is logged in (for example, to show/hide UI or protect a route),
it uses the session data from the JWT via useSession() or getSession()

What is stored?	            Where?	            How is it accessed in React?
JWT (with user info)	Client-side cookie	   SessionProvider + useSession()
Server session	         Database	           SessionProvider + useSession()

*/
