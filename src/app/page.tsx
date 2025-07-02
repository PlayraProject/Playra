'use client';

import { useWalletHook } from '../hooks/useWalletHook';
import Game from '@/components/Game/Game';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getLeaderboard, LeaderboardEntry } from 'playra-sdk';
import Navigation from '@/components/Navigation/Navigation';

export default function HomePage() {
  const { walletAddress, handleConnect } = useWalletHook();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>();

  const refreshLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaders(data); 
  };

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <main className={styles.main}>
      <Navigation />
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
          Підключити Phantom
        </button>
      )}
    </main>
  );
}
