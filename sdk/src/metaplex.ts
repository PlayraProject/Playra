import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Metaplex, mplStorage  } from '@metaplex-foundation/js';

export const connection = new Connection(clusterApiUrl('devnet'));

export const metaplex = Metaplex.make(connection)
  .use(bundlrStorage());

export const mintAuthority = Keypair.generate();