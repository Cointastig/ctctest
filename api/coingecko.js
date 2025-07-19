// api/coingecko.js - Vercel Serverless Function with Security
// Allowed CoinGecko endpoints
const ALLOWED_ENDPOINTS = [
  'simple/price',
  'simple/token_price',
  'coins/list',
  'coins/markets',
  'exchange_rates',
  'global',
  'trending'
];

// Validate endpoint
function isAllowedEndpoint(endpoint) {
  return ALLOWED_ENDPOINTS.some(allowed => 
    endpoint.startsWith(allowed) || endpoint === allowed
  );
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the endpoint from query parameters
    const { endpoint, ...params } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    // Validate endpoint against whitelist
    if (!isAllowedEndpoint(endpoint)) {
      return res.status(403).json({ error: 'Endpoint not allowed' });
    }

    // Build query string from remaining parameters
    const queryString = new URLSearchParams(params).toString();

    // Build the CoinGecko API URL
    const coingeckoUrl = `https://api.coingecko.com/api/v3/${endpoint}${queryString ? '?' + queryString : ''}`;
    
    // Optional: Use API key if available
    const headers = {
      'Accept': 'application/json',
    };
    
    // Add API key if configured in environment
    if (process.env.COINGECKO_API_KEY) {
      headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY;
    }
    
    // Forward the request to CoinGecko
    const response = await fetch(coingeckoUrl, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data from CoinGecko',
      message: error.message 
    });
  }
}
