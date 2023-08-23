import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@hygraph/utils';

export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";

    const body = req.body;
    const signature = "sign=rORNNBjFda8SaTKCyb4nSWo74hVqaMKE+qH36Dd0W1oy, env=master, t=1692823057842";
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