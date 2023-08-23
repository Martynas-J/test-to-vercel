
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
    console.log(data)

    // Perform any actions or data processing here

    await res.revalidate("/");
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error processing webhook');
  }
}