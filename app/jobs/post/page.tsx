"use client";
// This page allows users to post a job listing
import { FormEvent } from "react";
//FormEvent is used to handle form submission events in React

export default function PostJobPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // this stops the page from reloading when the form is submitted

    const formData = new FormData(e.currentTarget);
    // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values.
    // It is commonly used to send form data in HTTP requests, especially when dealing with file uploads or complex data structures.
    //e.currentTarget refers to the form element that triggered the submit event, allowing you to access its data.

    //data object is created to hold the job listing details
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary"),
    };

    // The data object is then sent to the server via a POST request to the "/api/jobs" endpoint
    //fetch is a built-in JavaScript function that allows you to make network requests, such as sending data to a server or retrieving data from an API.
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // converts the data object to a JSON string for transmission
      });
      window.location.href = "/jobs"; // Redirects the user to the jobs page after successful submission
    } catch (err) {
      console.log(err);
    }
  };
  const heroImage =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80";
  //form fields are created to collect job details such as title, company, location, type, description, and salary
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
              Post a Job
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-900 font-medium">
          Share your opportunity with thousands of talented professionals. Fill out the form below to post a new job opening.
          </p>
        </div>
      </div>
    
    <div className="max-w-2xl mx-auto">
      <form className="space-y-7" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-base font-semibold text-blue-800"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-base font-semibold text-blue-800"
          >
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-base font-semibold text-blue-800"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-base font-semibold text-blue-800"
          >
            Job Type
          </label>
          <select
            name="type"
            id="type"
            required
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          >
            <option value="">Select a type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-base font-semibold text-blue-800"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            required
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          />
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-base font-semibold text-blue-800"
          >
            Salary <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            placeholder="e.g., $80,000 - $100,000"
            className="mt-2 block w-full border border-blue-200 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium bg-blue-50/50 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-yellow-400 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-yellow-500 transition"
        >
          Post Job
        </button>
      </form>
    </div>
    </div>
  );
}

/* explain this page 
This is a Next.js page component that allows users to post job listings. It includes a form 
with fields for job title, company, location, job type, description, and an optional salary 
field. 
*/
