import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@hygraph/utils';

export const POST = async (req, res) => {
    const secret = "51528335b4a7e132-8a78cc1644bdd854-49429d9502d9f6a0";

    const body = {};
    const signature = "sign=43Y1nTd/xh1T+y3Hi2R4Jx+qJ8/VFgVYdSfXQFg8ZZQ=, env=master, t=1692820497695";
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
        return new NextResponse("Veikia" + isValid, { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}