export default async function handler(req, res) {
  const { address } = req.query;

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/txs/token?address=${address}&limit=50&tx_type=swap&sort_type=desc`,
      {
        headers: {
          'X-API-KEY': process.env.BIRDEYE_API_KEY,
          'x-chain': 'solana'
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch trades' });
  }
}
