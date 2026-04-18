export default async function handler(req, res) {
  const { address, limit = '50' } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'missing address' });
  }

  // clamp limit (Birdeye max = 50)
  const parsedLimit = Math.max(1, Math.min(Number(limit) || 50, 50));

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/txs/token?address=${encodeURIComponent(address)}&offset=0&limit=${parsedLimit}&tx_type=swap&sort_type=desc`,
      {
        headers: {
          'X-API-KEY': process.env.BIRDEYE_API_KEY,
          'x-chain': 'solana'
        }
      }
    );

    // handle rate limit / API errors cleanly
    if (!response.ok) {
      const text = await response.text();

      return res.status(response.status).json({
        error: 'birdeye request failed',
        status: response.status,
        details: text.slice(0, 300)
      });
    }

    const data = await response.json();

    // 🔥 caching layer (BIG performance win)
    res.setHeader(
      'Cache-Control',
      's-maxage=5, stale-while-revalidate=10'
    );

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: 'failed to fetch trades',
      message: err.message
    });
  }
}
