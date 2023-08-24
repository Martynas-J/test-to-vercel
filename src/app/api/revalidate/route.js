import { NextResponse } from 'next/server';
import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'

export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";

    const signature = headers().get("gcms-signature");

    const [rawSign, rawEnv, rawTimestamp] = signature.split(', ');

    const sign = rawSign.replace('sign=', '');
    const EnvironmentName = rawEnv.replace('env=', '');
    const Timestamp = parseInt(rawTimestamp.replace('t=', ''));

    let payload = JSON.stringify({
        Body: JSON.stringify({
            "operation": "publish",
            "data": {
              "__typename": "Post",
              "content": {
                "__typename": "RichText",
                "raw": {
                  "children": [
                    {
                      "children": [
                        {
                          "text": "cx"
                        }
                      ],
                      "type": "paragraph"
                    }
                  ]
                }
              },
              "createdAt": "2023-08-24T10:56:01.855287+00:00",
              "createdBy": {
                "__typename": "User",
                "id": "clljx52d51ri901t4axmnfggi"
              },
              "id": "cllp1sztb59sv0bmmm1hbp5me",
              "publishedAt": "2023-08-24T10:56:02.213464+00:00",
              "publishedBy": {
                "__typename": "User",
                "id": "clljx52d51ri901t4axmnfggi"
              },
              "scheduledIn": [],
              "stage": "PUBLISHED",
              "title": "cx",
              "updatedAt": "2023-08-24T10:56:01.855287+00:00",
              "updatedBy": {
                "__typename": "User",
                "id": "clljx52d51ri901t4axmnfggi"
              }
            }
          }),
        EnvironmentName,
        TimeStamp: Timestamp,
    });

    const { createHmac } = require('crypto');

    const hash = createHmac('sha256', secret).update(payload).digest('base64');
    // const isValid = sign === hash;

    // console.log(req)
    // console.log(JSON.stringify(req.body))
    console.log(payload)
    console.log(hash)
    console.log(sign)

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // if (!isValid) {
    //     return new NextResponse(" Invalid token Error :(", { status: 401 });
    // }

    try {
        revalidatePath('/')
        return new NextResponse("Veikia", { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}