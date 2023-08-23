import { apiResolver } from 'next/dist/next-server/server/api-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Process the data from the POST request
    // You can access the request body using req.body
    // For example:
    const data = req.body;

    // Perform any actions or data processing here

    await apiResolver(req, res, undefined, '/'); // Revalidate the '/'
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).send('Error processing webhook');
  }
}