'use client';

import { useState, useEffect } from 'react';
import { connectWallet } from 'playra-sdk';

export function useWalletHook() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (e) {
      console.error('Помилка', e);
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
        console.log('Гаманець раніше не був дозволений:', err);
      });

      provider.on('disconnect', () => {
        setWalletAddress(null);
      });
    }
  }, []);

  return { walletAddress, handleConnect };
}