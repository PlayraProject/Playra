'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navigation from '@/components/Navigation/Navigation';

type ScoreEntry = {
  address: string;
  score: number;
};

export default function ProfilePage() {
  const { publicKey } = useWallet();
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    const stored = localStorage.getItem('playra-leaderboard');
    if (stored) {
      try {
        const parsed: ScoreEntry[] = JSON.parse(stored);
        const userScores = parsed.filter(
          (entry) => entry.address === publicKey.toBase58()
        );

        if (userScores.length > 0) {
          const maxScore = Math.max(...userScores.map((entry) => entry.score));
          setBestScore(maxScore);
          setGamesPlayed(userScores.length);
        }
      } catch (e) {
        console.error('Помилка', e);
      }
    }
  }, [publicKey]);

  return (
    <main className={styles.main}>
      <Navigation />
      <h1 className={styles.title}>Профіль гравця</h1>

      {publicKey ? (
        <div className={styles.infoBlock}>
          <p>
            <span className={styles.label}>гаманець:</span>{' '}
            {publicKey.toBase58()}
          </p>
          <p>
            <span className={styles.label}>Найкращий результат:</span>{' '}
            {bestScore !== null ? bestScore : '—'}
          </p>
          <p>
            <span className={styles.label}>Зіграно ігр:</span>{' '}
            {gamesPlayed !== null ? gamesPlayed : '—'}
          </p>

          <a
            className={styles.explorerLink}
            href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🔍 Подивитися свої NFT на Solscan
          </a>
        </div>
      ) : (
        <p className={styles.warning}>Будь ласка, підключіть гаманець</p>
      )}
    </main>
  );
}
