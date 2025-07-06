import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // searchParams is a promise that resolves to an object containing the query parameters from the URL
  // [key: string] means the object can have any number of properties with string keys
  //[key: string]: string | string[] | undefined means the value of each property can be a string, an array of strings, or undefined if the parameter is not provided
}) {
  const { q, type, location } = await searchParams; // Awaiting the searchParams promise to get the query parameters from the URL

  // type defining the search parameters because searchParams is a promise that resolves to an object without a specific type, we need to define the types of the parameters we expect to receive
  const query = q as string | undefined; // string | undefined means the query can be a string or undefined if not provided
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;

  // Constructing the prisma query to fetch jobs from the database based on the search parameters
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true }, //postedBy is included to fetch the user who posted the job
    //there is relation between job and user, in job model, postedBy is a relation field that connects to the User model
    //so every job has a postedBy field that contains the user who posted the job
  });
  
  const heroImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Hero Section */}
    <div
        className="relative rounded-3xl overflow-hidden mb-12 shadow-lg "
        style={{ minHeight: "220px" }}
      >
        <img
          src={heroImage}
          alt="Dashboard background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-12">
          <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-lg tracking-tight">
            <span className="inline-flex items-center gap-3">
              <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 6V3m0 0C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 0v3m0 0l2 2m-2-2l-2 2" /></svg>
              Find Your Next Opportunity
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-900 font-medium">
          Explore a wide range of exciting job opportunities from top companies. Use the search and filters below to find your next career move.
          </p>
        </div>
      </div>

    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-1 rounded-xl shadow-md">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <form className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <input
                type="text"
                name="q"
                placeholder="Search jobs, companies..."
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm transition"
              />
            </div>
            <div className="flex-1 w-full">
              <select
                name="type"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm transition"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm transition"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold shadow transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Stack cards vertically with space between */}
      <div className="flex flex-col space-y-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-blue-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-500 mb-2">{job.company}</p>
              <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"></path>
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 17v-2a4 4 0 018 0v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {job.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                Posted by{" "}
                <span className="font-medium text-gray-700">
                  {job.postedBy.name}
                </span>
              </span>
              <div className="flex items-center space-x-3">
                {job.salary && (
                  <span className="text-lg font-semibold text-blue-900">
                    {job.salary}
                  </span>
                )}
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-blue-600 hover:text-yellow-600 font-semibold transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

/*
Why No GET Request or API Route Is Used Here
In your JobsPage component, you are not making a client-side GET request to an API route to 
fetch jobs. Instead, you are directly querying the database using Prisma inside a server 
component. 

Here’s why this approach is used and how it works:
1. Server Components in Next.js App Router
In the Next.js App Router (app/ directory), components can be server components by default 
(unless marked with "use client").

Server components run on the server, not in the browser. This means you can safely access your 
database and environment variables directly in these components.

- while in client components, you would need to make fetch requests to API routes ,
and then prisma client is used there in route endpoint to perform the database operations 
like get, create, update, or delete jobs.


*/
