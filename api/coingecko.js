/* eslint-disable consistent-return */
export default async function handler(req, res) {
  // CORS pre‑flight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(204).end();
  }

  const { endpoint = '' } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' });

  const url = `https://api.coingecko.com/api/v3/${endpoint}`;
  try {
    const cgRes = await fetch(url, {
      headers: {
        'X-Cg-Pro-Api-Key': process.env.COINGECKO_API_KEY || ''
      },
      next: { revalidate: 60 }
    });
    const data = await cgRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(cgRes.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Upstream error' });
  }
}
