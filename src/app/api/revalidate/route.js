import { NextResponse } from 'next/server';
import { generateWebhookSignature, verifyWebhookSignature } from '@hygraph/utils';
import { headers } from "next/headers";


export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";

    const headersList = headers();
    const referer = headersList.get("gcms-signature");

    console.log(referer)
    console.log(req.body)
    const body = {};
    const signature = referer;
    const isValid = verifyWebhookSignature({ body, signature, secret });



    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (!isValid) {
        return new NextResponse(" Invalid token Error :(", { status: 401 });
    }

    try {
        // const data = req.body;
        // console.log(data)
        // Perform any actions or data processing here
        // await res.revalidate("/");
        return new NextResponse("Veikia" + isValid, { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}