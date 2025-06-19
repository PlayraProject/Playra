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
        console.error('Ошибка чтения из localStorage:', e);
      }
    }
  }, [publicKey]);

  return (
    <main className={styles.main}>
      <Navigation />
      <h1 className={styles.title}>Профиль игрока</h1>

      {publicKey ? (
        <div className={styles.infoBlock}>
          <p>
            <span className={styles.label}>Кошелёк:</span>{' '}
            {publicKey.toBase58()}
          </p>
          <p>
            <span className={styles.label}>Лучший результат:</span>{' '}
            {bestScore !== null ? bestScore : '—'}
          </p>
          <p>
            <span className={styles.label}>Сыграно игр:</span>{' '}
            {gamesPlayed !== null ? gamesPlayed : '—'}
          </p>

          <a
            className={styles.explorerLink}
            href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🔍 Посмотреть свои NFT на Solscan
          </a>
        </div>
      ) : (
        <p className={styles.warning}>Пожалуйста, подключите кошелёк</p>
      )}
    </main>
  );
}
