import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: { postedAt: "desc" },
    include: { postedBy: { select: { name: true } } },
  });

  return (
    <div className="space-y-16 bg-gradient-to-b from-blue-50 via-white to-white min-h-screen pb-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-20 bg-white rounded-3xl shadow-xl max-w-6xl mx-auto mt-12 relative overflow-hidden">
        <div className="md:w-1/2 px-8">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Discover thousands of job opportunities with top companies
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-gradient-to-r from-blue-600 to-yellow-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:scale-105 hover:from-blue-700 hover:to-yellow-500 transition-transform duration-200"
          >
            Browse Jobs
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center px-8 mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
            alt="Office workspace"
            className="rounded-2xl shadow-lg w-full h-64 object-cover object-center md:h-80"
          />
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Recent Jobs
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentJobs.map((job) => (
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
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"></path></svg>
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">
                  Posted by <span className="font-medium text-gray-700">{job.postedBy.name}</span>
                </span>
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-blue-600 hover:text-yellow-600 font-semibold transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/jobs"
            className="inline-block text-blue-700 hover:text-yellow-700 font-semibold text-lg underline underline-offset-4"
          >
            View All Jobs →
          </Link>
        </div>
      </section>
    </div>
  );
}

