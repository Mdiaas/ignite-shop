import {createContext, useState} from "react";
import { ReactNode } from 'react'

interface IProduct{
    id : string
    name : string
    imageUrl : string
    price : number
   
}

interface ShoppingCartContextProps{
    cartProducts:IProduct[],
    addProductToCart: (product:IProduct) => void
    removeProductFromCart: (product:string) => void
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
   return(
        <ShoppingCartContext.Provider
            value={{
                cartProducts,
                addProductToCart,
                removeProductFromCart
            }}
        >
        { children }
        </ShoppingCartContext.Provider>
    )
}