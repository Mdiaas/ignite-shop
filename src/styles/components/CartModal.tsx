import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog'
export const Overlay = styled(Dialog.Overlay, {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    inset: 0,
    "backgroundColor": 'rgba(0, 0, 0, 0.75)'
})
export const Content = styled(Dialog.Content, {
    minWidth: '32rem',
    borderRadius: '6px',
    padding: '2.5rem 3rem',
    background: '$gray800',
    position: 'fixed',
    top: '0',
    right: '0',
    height:'100vh',
    border:0,
    footer:{
        width:'100%',
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        'div.infoContainer':{
            width:'100%',
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            marginTop:'1.6rem',
            fontSize:'$md'
        },
        'div.buttonContainer':{
            display:"flex",
            justifyContent:"center",
            width:"100%",
            border:'1 px solid white',
            button:{
                marginTop: '3.6rem',
                padding: '1.25rem 7.8rem',
                border:0,
                borderRadius:8,
                color:'$white',
                backgroundColor:'$green500',
                cursor:"pointer",

                '&:disabled':{
                    opacity:0.7,
                    cursor:'not-allowed'
                }
            }
        },
        
    }
})

export const ItensList = styled('div', {
    minHeight: '70vh',
    display:"flex",
    flexDirection:"column",
    gap:'1.5rem'
})

export const Item = styled('div', {
    display:"flex",
    gap: '1.25rem',

    button:{
        marginTop:'0.5rem',
        display:"block",
        color:"$green500",
        border:0,
        background:"transparent",
        cursor:"pointer"
    }
})

export const ImageContainer  = styled('div', {
    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius:6,
    border:0, 
    height: '5.9rem',
    width: '5.9rem',
    img:{
        objectFit:"cover"
    }
})