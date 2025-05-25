# 🕹️ Solana Game NFT Reward System

This project is a prototype of a game with NFT rewards, where NFTs are automatically minted for player achievements. Everything runs on the Solana devnet, using Metaplex, with metadata uploaded to IPFS via Pinata.

## Tech Stack

-  **Next.js 15**
-  **Solana + Metaplex JS SDK**
-  **NFT with IPFS (Pinata)**
-  **@solana/wallet-adapter** 
-  **TypeScript** 

---

## 📁 Project Structure

```bash
.
├── sdk/                      # Business logic
│   ├── index.ts             # Utility re-exports
│   ├── metaplex.ts          # Metaplex SDK initialization
│   ├── pinata.ts            # Upload images and metadata to IPFS via Pinata
│   └── reward.ts            # NFT minting logic
│
├── src/
│   ├── app/                 # Pages and routes (Next.js App Router)
│   ├── components/          # UI components
│   │   ├── ConnectWallet/   # Wallet connect button
│   │   ├── Game/            # Main game interface
│   │   ├── Leaderboard/     # Leaderboard
│   │   └── Provider/        # Contexts and wrappers
│   └── hooks/               # Custom hooks
│
├── .env.local               # Secret keys (Pinata)
├── next.config.mjs          # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── README.md                # Documentation (this file)
├── package.json
└── package-lock.json