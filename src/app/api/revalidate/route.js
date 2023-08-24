import { NextResponse } from 'next/server';
import { generateWebhookSignature, verifyWebhookSignature } from '@hygraph/utils';
import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'


export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";
    const body = ""
    const signature = headers().get("gcms-signature");
    console.log(signature)
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))
    console.log(generateWebhookSignature({ body, secret }))


    const isValid = verifyWebhookSignature({ body, signature, secret });
    const isValid2 = verifyWebhookSignature({ body, signature, secret });
    const isValid3 = verifyWebhookSignature({ body, signature, secret });
    const isValid4 = verifyWebhookSignature({ body, signature, secret });
    console.log(isValid)
    console.log(isValid2)
    console.log(isValid3)
    console.log(isValid4)



    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // if (!isValid) {
    //     return new NextResponse(" Invalid token Error :(", { status: 401 });
    // }

    try {
        // const data = req.body;
        // console.log(data)
        // Perform any actions or data processing here
        // await res.revalidate("/");
        revalidatePath('/')
        return new NextResponse("Veikia" + isValid, { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}