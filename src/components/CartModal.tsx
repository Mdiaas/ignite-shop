import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import {  useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'
import { Content, Item, ItensList, Overlay, ImageContainer } from '../styles/components/CartModal'
import { priceFormatter } from '../utils/formatValues'
export function CartModal(){
    const { cartProducts,removeProductFromCart, buyProducts } = useContext(ShoppingCartContext)
    
    const totalItems =  cartProducts.reduce(
        (acc, product) => {
            acc.total += product.price
            return acc
        },
        {
            total: 0,
        }
    )
    function handleRemoveItemFromCart(id : string){
        removeProductFromCart(id)
    }
    function handleBuyProducts(){
        buyProducts()
    }
    return (
        <Dialog.Portal>
            <Overlay></Overlay>
            <Content>
                <Dialog.Title>Meu carrinho</Dialog.Title>
                <ItensList>
                    {cartProducts.length > 0 ? cartProducts.map((product) => {
                        return (
                            <Item key={product.id}>
                                <ImageContainer>
                                    <Image src={product.imageUrl} width={94} height={94} alt=""></Image>
                                </ImageContainer>
                                <div>
                                    <h2>{product.name}</h2>
                                    <span>{priceFormatter.format(product.price)}</span>
                                    <button onClick={() => {handleRemoveItemFromCart(product.id)}}><strong>remover</strong></button>
                                </div>
                            </Item>
                        )
                    }) : 
                        <h1>carrinho vazio</h1>
                    }
                </ItensList>
                <footer>
                    <div className='infoContainer'>
                        <span>Quantidade itens</span><span>{cartProducts.length}</span>
                    </div>
                    <div className='infoContainer'>  
                        <span><strong>Valor total</strong></span>  <span> {priceFormatter.format(totalItems.total)}</span>
                    </div>
                    <div className='buttonContainer'>
                        <button onClick={handleBuyProducts} disabled={cartProducts.length==0}>
                            <strong>Finalizar compra</strong>
                        </button>
                    </div>
                </footer>
            </Content>
        </Dialog.Portal>
    )
}
