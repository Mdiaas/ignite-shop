import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import { Handbag } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import { CartModal } from '../components/CartModal';
import { useRouter } from 'next/router';
globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showCartButton = router.pathname !== '/success'
  
  return(
      <ShoppingCartContextProvider>
          <Container>
            <Header>
              <Image src={logoImg} alt="" />
              
              {showCartButton && 
                <Dialog.Root> 
                  <Dialog.Trigger asChild>
                    <div>
                      <Handbag size={32}></Handbag>
                    </div>
                  </Dialog.Trigger> 
                  <CartModal></CartModal>
                </Dialog.Root>
                }
            </Header> 
            <Component {...pageProps} /> 
          </Container>
        </ShoppingCartContextProvider>
  )
}
