'use client';

import { useWallet } from '../hooks/useWallet';
import Game from '@/components/Game/Game';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getLeaderboard } from 'playra-sdk';

export default function HomePage() {
  const { walletAddress, handleConnect } = useWallet();
  const [leaders, setLeaders] = useState([]);

  const refreshLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaders(data);
  };

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <main className={styles.main}>
      {walletAddress ? (
        <>
          <div className={styles.connected}>
            ✅ {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>

          <Game onScoreSubmitted={refreshLeaderboard} />
          <Leaderboard leaders={leaders} />
        </>
      ) : (
        <button className={styles.button} onClick={handleConnect}>
          Подключить Phantom
        </button>
      )}
    </main>
  );
}