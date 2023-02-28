import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutContainer from './shared/components/layouts/LayoutContainer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutContainer>
      <Component {...pageProps} />
    </LayoutContainer>
  );
}
