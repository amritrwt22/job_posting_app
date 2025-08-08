import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-blue-100">
        <div className="mb-8">
          <Link
            href="/jobs"
            className="text-blue-600 hover:text-yellow-500 font-semibold mb-4 inline-flex items-center gap-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2 flex items-center gap-2">
            <svg
              className="w-7 h-7 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M9 17v-2a4 4 0 018 0v2"></path>
            </svg>
            {job.title}
          </h1>
          <p className="text-2xl text-blue-600 font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" />
            </svg>
            {job.company}
          </p>
          <div className="flex items-center gap-4 text-blue-500 mb-6 font-medium">
            <span className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"></path>
              </svg>
              {job.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              {job.type}
            </span>
            {job.salary && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-900 font-bold">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3" />
                  </svg>
                  {job.salary}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm text-blue-400 font-semibold">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              Posted by {job.postedBy.name}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3" />
              </svg>
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 17v-2a4 4 0 018 0v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Job Description
          </h2>
          <div className="text-blue-900 whitespace-pre-wrap font-medium">
            {job.description}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-blue-100">
          <ApplyButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
