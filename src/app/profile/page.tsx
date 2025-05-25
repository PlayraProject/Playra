'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navigation from '@/components/Navigation/Navigation';

export default function ProfilePage() {
  const { publicKey } = useWallet();
  const [score, setScore] = useState<number | null>(null);
  const [nftImage, setNftImage] = useState<string | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('lastScore');
    const savedImage = localStorage.getItem('lastNftImage');
    if (savedScore) setScore(parseInt(savedScore));
    if (savedImage) setNftImage(savedImage);
  }, []);

  return (
    <main className={styles.main}>
      <Navigation />
      <h1 className={styles.title}>Профиль игрока</h1>

      {publicKey ? (
        <div className={styles.infoBlock}>
          <p><span className={styles.label}>Кошелёк:</span> {publicKey.toBase58()}</p>
          <p><span className={styles.label}>Лучший результат:</span> {score ?? '—'}</p>

          {nftImage && (
            <div>
              <p className={styles.label}>Последняя NFT-награда:</p>
              <img src={nftImage} alt="NFT" className={styles.nftImage} />
            </div>
          )}
        </div>
      ) : (
        <p className={styles.warning}>Пожалуйста, подключите кошелёк</p>
      )}
    </main>
  );
}