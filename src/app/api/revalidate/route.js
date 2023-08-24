import { NextResponse } from 'next/server';
import { headers } from "next/headers";
import { revalidatePath, revalidateTag, cache } from 'next/cache'
import { createHmac } from 'crypto';

// export const revalidate = 0;  

export const POST = async (req, res) => {
    const secret = process.env.HYGRAPH_POSTS_WEBHOOK_KEY

    const signature = headers().get("gcms-signature");

    const [rawSign, rawEnv, rawTimestamp] = signature.split(', ');

    const sign = rawSign.replace('sign=', '');
    const EnvironmentName = rawEnv.replace('env=', '');
    const Timestamp = parseInt(rawTimestamp.replace('t=', ''));

    const bodyReq = await req.json()
    const body = JSON.stringify(bodyReq)

    let payload = JSON.stringify({
        Body: body,
        EnvironmentName,
        TimeStamp: Timestamp,
    });

    const hash = createHmac('sha256', secret).update(payload).digest('base64');
    const isValid = sign === hash;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (!isValid) {
        return new NextResponse(" Invalid token Error :(", { status: 401 });
    }

    try {
        // revalidatePath('/a')
        // await res.revalidate('/a');
        await cache.revalidate(req, ['/a']);
        return new NextResponse("Veikia", { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}