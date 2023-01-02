import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"
import { useContext, useState } from "react";
import Stripe from "stripe";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/products";
import { priceFormatter } from "../../utils/formatValues";

interface ProductProps{
    product:{
        id : string
        name : string
        imageUrl : string
        price : number
        description: string,
        defaultPriceId: string
    }
  }

export default function Product({product} : ProductProps){
    const [isCreatingCheckoutSection, setIsCreatingCheckoutSection] = useState(false)
    const { addProductToCart } = useContext(ShoppingCartContext)
    const { isFallback } = useRouter()


    function handleAddProductToCart(){
        const productToAdd ={
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description,
            priceId: product.defaultPriceId
        }
        addProductToCart(productToAdd)
    }
    if(isFallback){
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            <Head>
                <title>{product.name} | Ignite-shop</title>
            </Head>
            <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="" width={520} height={480}></Image>
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{priceFormatter.format(product.price)}</span>
                <p> { product.description } </p>
                <button onClick={handleAddProductToCart} disabled={isCreatingCheckoutSection}>Adicionar ao carrinho</button>
            </ProductDetails>
        </ProductContainer>
        </>
        
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths:[],
        fallback:true
    }
}
export const getStaticProps: GetStaticProps<any, { id:string}> = async ({params}) => {
    const productId = params.id
    
    const product = await stripe.products.retrieve(productId,{
        expand:['default_price']
    })

    const price = product.default_price as Stripe.Price
    return{
        props:{
            product:{
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: (price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id 
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}