import { Provider } from '@/components/Provider/Provider';
import '@solana/wallet-adapter-react-ui/styles.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}