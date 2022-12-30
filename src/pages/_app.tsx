import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return(
      <ShoppingCartContextProvider>
          <Container>
            <Header>
              <Image src={logoImg} alt="" />  
            </Header> 
            <Component {...pageProps} /> 
          </Container>
        </ShoppingCartContextProvider>
  )
}
