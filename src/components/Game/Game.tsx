'use client';

import { useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { submitScore } from 'playra-sdk';
import styles from './Game.module.css';
import { mintRewardNFT } from 'sdk/src/reward';
import { useWalletHook } from '@/hooks/useWalletHook';

export default function Game({ onScoreSubmitted }: { onScoreSubmitted: () => void }) {
  const wallet = useWallet();
  const { walletAddress } = useWalletHook();
  const [score, setScore] = useState(0);
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    setScore(prev => prev + 1);
    setSent(false);
  };

  const handleSubmit = async () => {
    if (!wallet.publicKey || !walletAddress) {
      alert('Сначала подключите кошелек!');
      return;
    }

    try {
      await submitScore(score, walletAddress);
      setSent(true);
      onScoreSubmitted();
      if (score >= 50) {
        const file = new File(
          [new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#000"/><text x="50%" y="50%" font-size="24" fill="#fff" dominant-baseline="middle" text-anchor="middle">Score: ${score}</text></svg>`], { type: 'image/svg+xml' })],
          `score-${score}.svg`
        );
        console.log(wallet);
        
         await mintRewardNFT(file, wallet, score);
        alert('Поздравляем! Вы получили NFT-награду!');
      } 
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