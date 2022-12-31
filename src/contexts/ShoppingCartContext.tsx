import axios from "axios";
import {createContext, useState} from "react";
import { ReactNode } from 'react'

interface IProduct{
    id : string
    name : string
    imageUrl : string
    price : number,
    priceId: string
   
}

interface ShoppingCartContextProps{
    cartProducts:IProduct[],
    addProductToCart: (product:IProduct) => void
    removeProductFromCart: (product:string) => void,
    buyProducts: () => void
}


interface ShoppingCartContextProviderProps{
    children: ReactNode
}

interface Product{
    name: string,
    value:number
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function ShoppingCartContextProvider({children}: ShoppingCartContextProviderProps){
   const [cartProducts, setCartProducts] = useState<IProduct[]>([] as IProduct[])

    function addProductToCart(product:IProduct){
        
        const isAlreadyInCart = cartProducts.some((productInCart) => product.id === productInCart.id)
        if(!isAlreadyInCart)
            setCartProducts((state) => [product, ...state])
    }

    function removeProductFromCart(productToRemove:string){
        const productWithoutDeletedOne = cartProducts.filter((product) => product.id !== productToRemove)
        setCartProducts(productWithoutDeletedOne)
    }
    async function buyProducts(){
        const pricesIds = cartProducts.reduce((acc, products)=>{
            acc.push({
                price:products.priceId,
                quantity: 1
            })
            return acc
        },[])

        const response = await axios.post('/api/checkout',{
            priceId: pricesIds
        })
        const { checkoutUrl } = response.data
        window.location.href = checkoutUrl
    }
   return(
        <ShoppingCartContext.Provider
            value={{
                cartProducts,
                addProductToCart,
                removeProductFromCart,
                buyProducts
            }}
        >
        { children }
        </ShoppingCartContext.Provider>
    )
}