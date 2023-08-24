import { NextResponse } from 'next/server';
import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'
import { verifyWebhookSignature } from '@hygraph/utils';

export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";

    const signature = headers().get("gcms-signature");

    const bodyReq = await req.json()
    const body = JSON.stringify(bodyReq)
    const isValid = verifyWebhookSignature({ body, signature, secret });

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (!isValid) {
        return new NextResponse(" Invalid token Error :(", { status: 401 });
    }

    try {
        revalidatePath('/')
        return new NextResponse("Veikia", { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}