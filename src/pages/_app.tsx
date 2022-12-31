import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import { Handbag } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import { CartModal } from '../components/CartModal';
globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return(
      <ShoppingCartContextProvider>
          <Container>
            <Header>
              <Image src={logoImg} alt="" />
              <div>
                <Dialog.Root> 
                  <Dialog.Trigger asChild>
                    <Handbag size={32}></Handbag>
                  </Dialog.Trigger> 
                  <CartModal></CartModal>
                </Dialog.Root>
              </div>
            </Header> 
            <Component {...pageProps} /> 
          </Container>
        </ShoppingCartContextProvider>
  )
}
