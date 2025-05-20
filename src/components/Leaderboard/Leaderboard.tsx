'use client';

import styles from './Leaderboard.module.css';

type Player = {
  address: string;
  score: number;
};

export default function Leaderboard({ leaders }: { leaders: Player[] }) {
  return (
    <div className={styles.board}>
      <h2>🏆 Лидеры</h2>
      <ul>
        {leaders.map((p, i) => (
          <li key={p.address}>
            <strong>{i + 1}.</strong> {p.address.slice(0, 6)}...{p.address.slice(-4)} — {p.score} очков
          </li>
        ))}
      </ul>
    </div>
  );
}