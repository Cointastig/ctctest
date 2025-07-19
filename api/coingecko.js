module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get and validate endpoint
  const { endpoint } = req.query;
  
  if (!endpoint || typeof endpoint !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid endpoint parameter' });
  }

  // Clean and validate the endpoint
  const cleanEndpoint = endpoint.trim();
  
  // Validate against allowed endpoints
  const allowedEndpoints = [
    'simple/price',
    'coins/markets',
    'coins/bitcoin',
    'coins/ethereum',
    'coins/tether',
    'coins/binancecoin',
    'coins/solana'
  ];
  
  const endpointPath = cleanEndpoint.split('?')[0];
  const isAllowed = allowedEndpoints.some(allowed => endpointPath.startsWith(allowed));
  
  if (!isAllowed) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  // Build the full URL
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const url = `${baseUrl}/${cleanEndpoint}`;

  console.log('CoinGecko API Request:', url);

  try {
    const headers = {
      'Accept': 'application/json',
      'User-Agent': 'CTC-Wallet/1.0'
    };

    // Add API key if available
    const apiKey = process.env.COINGECKO_API_KEY;
    if (apiKey && apiKey.trim() !== '') {
      headers['X-Cg-Pro-Api-Key'] = apiKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '60';
        res.setHeader('Retry-After', retryAfter);
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          retryAfter: parseInt(retryAfter)
        });
      }
      
      return res.status(response.status).json({ 
        error: 'Upstream API error',
        status: response.status,
        message: response.statusText
      });
    }

    const data = await response.json();
    
    // Set cache headers for better performance
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('CoinGecko proxy error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
    });
  }
};
