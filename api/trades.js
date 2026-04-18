export default async function handler(req, res) {
  const { address, limit = '50' } = req.query;

  // 🛑 Validate input
  if (!address) {
    return res.status(400).json({ error: 'missing address' });
  }

  // 🔒 Clamp limit (Birdeye free tier max is 50)
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

    // 👇 Read raw response first (for debugging)
    const text = await response.text();

    // ❌ If Birdeye fails, return FULL debug info
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'birdeye request failed',
        status: response.status,
        details: text.slice(0, 500) // prevent huge logs
      });
    }

    // 🔄 Try parsing JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: 'invalid birdeye json',
        details: text.slice(0, 500)
      });
    }

    // ⚡ Cache (huge performance win on Vercel edge)
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=10');

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: 'failed to fetch trades',
      message: err.message
    });
  }
}
