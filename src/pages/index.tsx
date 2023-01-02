
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'
import { priceFormatter } from '../utils/formatValues'
interface IProduct{
  id : string
  name : string
  imageUrl : string
  price : number,
  priceId: string
}
interface HomeProps{
  products:IProduct[]
}
export default function Home({ products }: HomeProps) {
  const { cartProducts, addProductToCart } = useContext(ShoppingCartContext)
  const [sliderRef] = useKeenSlider({
    slides:{
      perView:3,
      spacing:48
    }
  })

  function handleAddCart(product:IProduct){
    addProductToCart(product)
  }
  return (
    
    <HomeContainer ref={sliderRef} className="keen_slider">
      {  products.map((product) => {
        return(
          <div 
            key={product.id}
          >
          <Product className='keen-slider__slide'>
            <Link 
              href={`/product/${product.id}`} 
              key={product.id}
              prefetch={false}
            >
              <Image  src= {product.imageUrl} width={520} height={480} alt=""/>
            </Link>
            <footer>
              <div className='info-items'>
                <strong>{product.name}</strong>
                <span>
                  {priceFormatter.format(product.price)}
                </span>
              </div>
              <div>
                <button onClick={() => handleAddCart(product)}>
                  <Handbag size={32}></Handbag>
                </button>
              </div>
            </footer>
          </Product>
          </div>
        )
      })

      }
      
      
    </HomeContainer>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return{
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      priceId: price.id
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2
  }
}