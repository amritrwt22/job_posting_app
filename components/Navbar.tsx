"use client";

import Link from "next/link";
import Image from "next/image";
// This hook is used to access the session data in a Next.js application
import { useSession } from "next-auth/react";
// This function is used to log out the user from the application - but wont update session state immediately
import { logout } from "@/lib/auth";
// This function is used to sign out the user from NextAuth - now when u signout
// the session state will be updated immediately, and the navbar will re-render correctly.
import { signOut } from "next-auth/react";

export default function Navbar() {
  //useSession is a hook from NextAuth that provides session data, including user authentication status
  //data: session contains the current user's session information, such as whether they are logged in or not.
  //data of useSession is named session
  const { data: session } = useSession();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Job Board Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Job Board
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Jobs
            </Link>

            {/* If the user is logged in, show the "Post a Job" and "Dashboard" links */}
            {session ? (
              <>
                <Link
                  href="/jobs/post"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Post a Job
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  // onClick={logout} // This function is used to log out the user from the application
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })} // This function is used to sign out the user from NextAuth
                  // updates session state immediately
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
/*
This is a Next.js component for the navigation bar of a job board application. It includes:
session management is handled using NextAuth, allowing users to sign in or out.
after signing in, user can access job posting, Dashboard, and sign out functionalities.
*/
