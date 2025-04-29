import styles from './page.module.css';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Playra</h1>
      <p className={styles.subtitle}>Подключи Phantom-кошелёк, чтобы начать</p>
      <div className={styles.walletConnectWrapper}>
        <ConnectWallet />
      </div>
    </main>
  );
}