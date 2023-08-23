import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@hygraph/utils';

export const POST = async (req, res) => {
    const secret = process.env.REVOKE_TOKEN;

    const body = {};
    const signature = '...';
    const isValid = verifyWebhookSignature({ body, signature, secret });


    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (isValid) {
        return new NextResponse(" Invalid token Error :(", { status: 401 });
    }

    try {
        // const data = req.body;
        // console.log(data)
        // Perform any actions or data processing here
        // await res.revalidate("/");
        return new NextResponse("Veikia", { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 501 });
    }
}