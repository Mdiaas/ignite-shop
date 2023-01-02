import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer } from "../styles/pages/success";
import { SuccessContainer } from "../styles/pages/success";

interface SuccessProps{
    customerName: string;
    products:{
        name: string,
        imageUrl: string
    }[]
}

export default function Success({ customerName, products } : SuccessProps){
    
    return (
        <>
            <Head>
                <title>Compra realizada com sucesso | Ignite-shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                
            <h1>Compra efetuada!</h1>
            <div>
            {products.map((product) => {
                return (
                    <ImageContainer key={product.imageUrl} className="imagesItems">
                        <Image src={product.imageUrl} alt="" width={120} height={110}></Image>
                    </ImageContainer>
                )
            })}
            </div>
            <p>
                Uhuul, <strong>{customerName}</strong>, sua compra de <strong>{ products.length } </strong> camisetas já está a caminho da sua casa
            </p>
            <Link href="/">
                Voltar ao catálogo
            </Link>
            </SuccessContainer>
            
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if(!query.session_id){
        return {
            redirect:{
                destination:"/",
                permanent: false
            }
        }
    }
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    
    
    const customerName = session.customer_details.name
    const response = session.line_items.data
    
    const boughtItems = response.reduce((acc, product) => {
        const productItem = product.price.product as Stripe.Product
        acc.push({
            name: productItem.name,
            imageUrl: productItem.images[0]
        })
        return acc
    },[])
    
    return{
        props:{
            customerName,
            products: boughtItems
        }
    }

}