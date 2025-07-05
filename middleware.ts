export { auth as middleware } from "./auth";

/* This middleware is used to protect routes in a Next.js application by ensuring that users 
are authenticated before accessing certain pages. It checks the user's session and redirects 
them to the sign-in page if they are not authenticated. This is essential for securing routes
that require user login, such as dashboards or account settings. 
*/