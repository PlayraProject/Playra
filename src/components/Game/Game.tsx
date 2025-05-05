'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { submitScore } from 'playra-sdk';
import styles from './Game.module.css';

export default function Game({ onScoreSubmitted }: { onScoreSubmitted: () => void }) {
  const { walletAddress } = useWallet();
  const [score, setScore] = useState(0);
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    setScore(prev => prev + 1);
    setSent(false);
  };

  const handleSubmit = async () => {
    if (!walletAddress) {
      alert('Сначала подключите кошелек!');
      return;
    }

    try {
      await submitScore(score, walletAddress);
      setSent(true);
      onScoreSubmitted(); 
    } catch (e) {
      console.error('Ошибка отправки очков:', e);
    }
  };

  return (
    <div className={styles.game}>
      <h2>Мини-игра: Кликер</h2>
      <p>Очки: {score}</p>
      <button onClick={handleClick}>+1 очко</button>
      <button onClick={handleSubmit}>Отправить результат</button>
      {sent && <p className={styles.success}>🎉 Отправлено!</p>}
    </div>
  );
}