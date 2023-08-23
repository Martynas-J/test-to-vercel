import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check for secret to confirm this is a valid request
//   if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }

  try {
    // Process the data from the POST request
    // You can access the request body using req.body
    // For example:
    // const data = req.body;
    // console.log(data)

    // Perform any actions or data processing here

    // await res.revalidate("/");
    return new NextResponse("Veikia", { status: 200 });
  } catch (err) {
    return new NextResponse(" Error :(", { status: 500 });
  }
}