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

  useEffect(() => {
    if (!publicKey) return;

    const stored = localStorage.getItem('playra-leaderboard');
    if (stored) {
      try {
        const parsed: ScoreEntry[] = JSON.parse(stored);
        const userScores = parsed
          .filter(entry => entry.address === publicKey.toBase58())
          .map(entry => entry.score);

        if (userScores.length > 0) {
          const maxScore = Math.max(...userScores);
          setBestScore(maxScore);
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
        </div>
      ) : (
        <p className={styles.warning}>Пожалуйста, подключите кошелёк</p>
      )}
    </main>
  );
}