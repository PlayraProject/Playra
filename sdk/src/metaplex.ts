import { Metaplex } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection } from '@solana/web3.js';

export const connection = new Connection(clusterApiUrl('devnet')); 

export const makeMetaplex = (walletAdapter: any) => {
  return Metaplex.make(connection).use(walletAdapter);
};