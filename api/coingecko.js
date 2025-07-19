/* eslint-disable consistent-return */
export default async function handler(req, res) {
  // Handle CORS pre‑flight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORIGIN || ''
    );
    res.status(204).end();
    return;
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing coin id' });
  }

  if (!process.env.COINGECKO_API_KEY) {
    console.warn(
      'Warning: COINGECKO_API_KEY is not set – falling back to unauthenticated rate limits.'
    );
  }

  try {
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}`,
      {
        headers: {
          'X-Cg-Pro-Api-Key': process.env.COINGECKO_API_KEY || ''
        },
        next: { revalidate: 60 } // 1‑min ISR cache
      }
    );

    if (!cgRes.ok) {
      return res.status(cgRes.status).json({ error: 'Upstream error' });
    }

    const data = await cgRes.json();

    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORIGIN || ''
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
