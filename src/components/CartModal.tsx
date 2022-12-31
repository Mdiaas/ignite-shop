import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'
import { Content, ItensList, Overlay } from '../styles/components/CartModal'
export function CartModal(){
    const { cartProducts } = useContext(ShoppingCartContext)
    
    return (
        <Dialog.Portal>
            <Overlay></Overlay>
            <Content>
                <Dialog.Title>Meu carrinho</Dialog.Title>
                <ItensList>
                    {cartProducts.map((product) => {
                        return (
                            <div key={product.id}>
                                <div>
                                    <Image src={product.imageUrl} width={94} height={94} alt=""></Image>
                                </div>
                                <div>
                                    <h2>{product.name}</h2>
                                    <span>{product.price}</span>
                                    <button>remover</button>
                                </div>
                            </div>
                        )
                    })}
                </ItensList>
                <footer>
                    <p>Quantidade <span> itens</span></p>
                    <p>Valor total  <span></span></p>
                    <div>
                        <button>
                            <strong>Finalizar compra</strong>
                        </button>
                    </div>
                </footer>
            </Content>
        </Dialog.Portal>
    )
}
