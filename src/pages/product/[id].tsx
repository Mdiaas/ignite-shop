import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/products";

export default function Product(){
    const { query } = useRouter();
    return (
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>
            <ProductDetails>
                <h1>Camiseta x</h1>
                <span>R$ 78,80</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur tempore earum eaque soluta quod eum, explicabo repudiandae amet? Ab dicta molestiae iure sit? Ea in iure consectetur alias minus adipisci.</p>
                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}