import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

const heroImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80";


export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const [applications, postedJobs] = await Promise.all([
    // Applications query
    prisma.application.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    }),

    //Jobs query
    prisma.job.findMany({
      where: {
        postedById: session.user.id,
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc",
      },
    }),
  ]);
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div
        className="relative rounded-3xl overflow-hidden mb-12 shadow-lg"
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
              Dashboard
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-900 font-medium">
            Manage your job postings and applications in one place.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Posted Jobs Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
              Posted Jobs
            </h2>
            <Link
              href="/jobs/post"
              className="text-blue-600 hover:text-yellow-500 font-semibold"
            >
              + Post New Job
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md divide-y divide-blue-50">
            {postedJobs.length === 0 ? (
              <p className="p-6 text-blue-400 text-center font-medium">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>
                  You haven't posted any jobs yet.
                </span>
              </p>
            ) : (
              postedJobs.map((job) => (
                <div key={job.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-1 flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        {job.title}
                      </h3>
                      <p className="text-gray-500 mb-2">{job.company}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"></path></svg>
                          {job.location}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                          {job.type}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>
                          {formatDistanceToNow(new Date(job.postedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>
                        {job._count.applications} applications
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-4">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-600 hover:text-yellow-500 text-sm font-semibold flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                      View Job
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Applications Section */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            Your Applications
          </h2>

          <div className="bg-white rounded-xl shadow-md divide-y divide-blue-50">
            {applications.length === 0 ? (
              <p className="p-6 text-blue-400 text-center font-medium">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>
                  You haven't applied to any jobs yet.
                </span>
              </p>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-1 flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        {application.job.title}
                      </h3>
                      <p className="text-gray-500 mb-2">
                        {application.job.company}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"></path></svg>
                          {application.job.location}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                          {application.job.type}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>
                          Applied{" "}
                          {formatDistanceToNow(
                            new Date(application.appliedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        application.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status === "PENDING" && (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                      )}
                      {application.status === "ACCEPTED" && (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      )}
                      {application.status === "REJECTED" && (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                      {application.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/jobs/${application.job.id}`}
                      className="text-blue-600 hover:text-yellow-500 text-sm font-semibold flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                      View Job
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}