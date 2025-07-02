import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
let userPublicKey: PublicKey | null = null;

const STORAGE_KEY = 'playra-leaderboard';

export type LeaderboardEntry = {
  address: string;
  score: number;
};

export async function connectWallet(): Promise<string> {
  const provider = window?.solana;
  if (!provider?.isPhantom) throw new Error('Phantom не знайден');

  const res = await provider.connect();
  userPublicKey = new PublicKey(res.publicKey.toString());
  return userPublicKey.toBase58();
}

export async function submitScore(score: number, address: string) {
    if (!address) throw new Error('Гаманець не підключен');
  
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as LeaderboardEntry[];
  
    const existingIndex = existing.findIndex(entry => entry.address === address);
  
    if (existingIndex >= 0) {
      if (score > existing[existingIndex].score) {
        existing[existingIndex].score = score; 
      }
    } else {
      existing.push({ address, score });
    }
  
    existing.sort((a, b) => b.score - a.score);
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as LeaderboardEntry[];
    return data.sort((a, b) => b.score - a.score);
  }