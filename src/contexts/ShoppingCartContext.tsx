import {createContext, useState} from "react";
import { ReactNode } from 'react'

interface IProduct{
    id : string
    name : string
    imageUrl : string
    price : string
   
}

interface ShoppingCartContextProps{
    cartProducts:IProduct[],
    addProductToCart: (product:IProduct) => void
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
        setCartProducts((state) => [product, ...state])
   }
   return(
        <ShoppingCartContext.Provider
            value={{
                cartProducts,
                addProductToCart
            }}
        >
        { children }
        </ShoppingCartContext.Provider>
    )
}