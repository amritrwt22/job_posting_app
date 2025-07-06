import { auth } from "@/auth"; // Importing the authentication function to check user sessions
import { prisma } from "@/lib/prisma"; // Importing the Prisma client for database operations
import { NextResponse } from "next/server"; // Importing NextResponse to handle HTTP responses in Next.js API routes

// This API route handles the creation of a new job posting
export async function POST(request: Request) {
  const session = await auth(); // Authenticate the user session

  // Check if the user is authenticated and has a valid ID
  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/singin", request.url));
  }
  
  try {
    const data = await request.json(); // Parse the incoming request body as JSON . why - this is used to get the job data from the request body
    
    // create a new job in the database using Prisma
    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session.user.id,
      },
    });
   // Return the created job as a JSON response , where? - this is the response to the client indicating that the job has been successfully created
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating job: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

/*
what is Request and NextResponse?
Request is a built-in object in Next.js that represents the incoming HTTP request to an API route. 
It contains information about the request, such as headers, body, method, and URL. 

NextResponse is a utility provided by Next.js to create HTTP responses in API routes.
response contains status codes, headers, and body content that will be sent back to the client.

in request body - the data is first stringified into JSON format before being sent to the server,
then it is parsed back into a JavaScript object using request.json() in the API route handler for processing.
then the data is used to create a new job in the database using Prisma ORM.
nextresponse stringifies the job object into JSON format and sends it back to the client as a response.
then the client can use this response to display the newly created job or update the UI accordingly.

"When a user submits a form, we use the fetch API to make an HTTP request (like POST) to a custom API endpoint defined in a route.ts file (for example, /api/jobs/route.ts).
The route.ts file exports a function for each HTTP method (like POST), which handles the request on the server, processes the data, and sends a response back to the client.
The client then receives this response and can update the UI or show a success message.
This pattern lets our frontend and backend communicate efficiently using standard HTTP methods."
*/