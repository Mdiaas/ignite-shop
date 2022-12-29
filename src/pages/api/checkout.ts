import { NextApiRequest, NextApiResponse } from "next";
import { TypePredicateKind } from "typescript";
import { stripe } from "../../lib/stripe";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    const { priceId } = request.body
    if(request.method !== 'POST'){
        return response.status(405).json({
            "error": "Method not allowed"
        })
    }
    if(!priceId){
        return response.status(400).json({
            "error": "Price not found"
        })
    }
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_URL}/success`,
        cancel_url: `${process.env.NEXT_URL}`,
        mode: 'payment',
        line_items: [{
            price: priceId,
            quantity: 1
        }]
    })

    return response.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}