'use client';

import { useState, useEffect } from 'react';
import { connectWallet } from 'playra-sdk';

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (e) {
      console.error('Ошибка подключения:', e);
    }
  };

  useEffect(() => {
    const provider = window?.solana;

    if (provider?.isPhantom) {
      provider.connect({ onlyIfTrusted: true }).then(res => {
        if (res?.publicKey) {
          setWalletAddress(res.publicKey.toString());
        }
      }).catch(err => {
        console.log('Кошелек не был ранее разрешён:', err);
      });

      provider.on('disconnect', () => {
        setWalletAddress(null);
      });
    }
  }, []);

  return { walletAddress, handleConnect };
}