import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log(req)
    // if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    //     return new NextResponse(" Invalid token Error :(", { status: 401 });
    // }

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