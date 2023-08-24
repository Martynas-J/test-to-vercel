import { NextResponse } from 'next/server';
import { generateWebhookSignature, verifyWebhookSignature } from '@hygraph/utils';
import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'


export const POST = async (req, res) => {
    const secret = "2e9291f10d44ca10204a4cd81b05d73b6a316b2b605d4e2e0e0b37b40198ce1f";
    const body = {
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
                      "text": "sdf"
                    }
                  ],
                  "type": "paragraph"
                }
              ]
            }
          },
          "createdAt": "2023-08-24T05:18:30.113252+00:00",
          "createdBy": {
            "__typename": "User",
            "id": "clljx52d51ri901t4axmnfggi"
          },
          "id": "cllopqxgs4set0blbsn3xh640",
          "publishedAt": "2023-08-24T05:18:30.783825+00:00",
          "publishedBy": {
            "__typename": "User",
            "id": "clljx52d51ri901t4axmnfggi"
          },
          "scheduledIn": [],
          "stage": "PUBLISHED",
          "title": "sdf",
          "updatedAt": "2023-08-24T05:18:30.113252+00:00",
          "updatedBy": {
            "__typename": "User",
            "id": "clljx52d51ri901t4axmnfggi"
          }
        }
      }
    const signature = headers().get("gcms-signature");
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
        revalidatePath('/')
        return new NextResponse("Veikia" + isValid, { status: 200 });
    } catch (err) {
        return new NextResponse(" Error :(", { status: 500 });
    }
}