# 🐾 Chonkrythmic

> **Live Solana DEX trades → pendulum physics → generative music**

A real-time audio-visual experience that translates on-chain swap activity into swinging pendulums and Chinese instrument sounds. Every buy and sell on Solana DEXs becomes motion and music.

🌐 **Live:** [studio.chonky.com/chonky_live_final.html](https://studio.chonky.com/chonky_live_final.html)

---

## 🎥 What It Does

- **16 pendulum balls** mapped to USD price tiers ($1–$5 up to $700+)
- Real DEX trades fetched via **Birdeye Data API** trigger ball motion
- Balls swing and hit V-shaped walls, playing a note on each impact
- **Buys** push balls faster · **Sells** slow them down
- 5 authentic Chinese instruments: Guqin, Erhu, Dizi, Guzheng, Xiao
- Notes mapped to a pentatonic scale — always sounds musical, never chaotic
- Stereo panning: left wall hit = left ear, right wall hit = right ear

---

## 🛰️ Data Stack

| Source | Used For |
|--------|----------|
| [Birdeye Data API](https://bds.birdeye.so) | Real individual swap data — buy/sell side, exact USD amounts, deduplication by txHash |
| Jupiter Price API v3 | Live token price + 24h change, SOL price |
| DexScreener Pairs API | Volume 24h, liquidity, FDV |
| Jupiter Plugin v1 | Floating swap widget (no RPC needed) |

### Why Birdeye?
Previous versions approximated trades using DexScreener m5 buy/sell count deltas — no individual tx data, no exact amounts. **Birdeye's `/defi/txs/token` endpoint** returns real individual swaps with:
- Exact USD volume per trade
- True buy/sell classification (no guessing from token flow)
- `txHash` for reliable deduplication
- Low latency — polled every 5 seconds

---

## 🪙 Tracked Tokens

| Token | Mint |
|-------|------|
| $CHONKY | `2MwjFE1zbXyNKw6VjzGWa3BhPtFcs8htuX2xwRAtbonk` |
| $SOLINU | `DUr5rZAfYduvihaiyMnfqgnhqYWbPWJXvK954qyTpump` |
| $POKI | `6vK6cL9C66Bsqw7SC2hcCdkgm1UKBDUE6DCYJ4kubonk` |
| $MEMESAI | `8D9foi1nqfabp8D3uNJCrzt1xkvxq8xHYH8Lxb4fbonk` |
| $HOSICO | `Dx2bQe2UPv4k3BmcW8G2KhaL5oKsxduM5XxLSV3Sbonk` |
| $BAOBAO | `7Da1f2wibgzZZheXnVvqYgbWpccnGPM2CJPUkdcebonk` |

---

## 🎛️ Price Tier → Ball Mapping

| Ball | Price Range | Ball | Price Range |
|------|------------|------|------------|
| 1 | $1–5 | 9 | $116–150 |
| 2 | $5–11 | 10 | $151–200 |
| 3 | $12–21 | 11 | $201–300 |
| 4 | $22–32 | 12 | $301–400 |
| 5 | $33–43 | 13 | $401–500 |
| 6 | $43–52 | 14 | $501–600 |
| 7 | $53–70 | 15 | $601–700 |
| 8 | $71–115 | 16 | $700+ |

---

## ⚙️ Settings

| Setting | What It Does |
|---------|-------------|
| **Flip Price** | Reverses tier→ball mapping (big trades → bottom instead of top) |
| **Flip Tone** | Reverses pentatonic note scale |
| **Restart** | Clears all balls; next live trade starts fresh |
| **Last 20/50/100 TX** | Silently warms up ball speeds from history — live feed stays clean |

---

## 🧱 Technical Stack

- Vanilla HTML/CSS/JS — single file, zero dependencies, zero build step
- Web Audio API — procedural Chinese instrument synthesis
- Canvas 2D — 60fps pendulum physics render loop
- Deployed via Vercel → `studio.chonky.com`

---

## 🏆 Built for Birdeye Data Build in Public Competition

This project uses the [Birdeye Data API](https://bds.birdeye.so) under `#BirdeyeAPI`.

Follow progress on X: [@chonkycom](https://x.com/chonkycom)

---

## 📁 File Structure

```
chonky_live_final.html   ← main app (single file)
README.md                ← this file
```

---

*Built with 🐾 by [@DenXSol](https://github.com/DenXSol)*
