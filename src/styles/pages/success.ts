import { styled } from "..";

export const  SuccessContainer = styled('main', {
    display:'flex',
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    margin: '0 auto',
    height:656,
    div:{
        display:"flex"
    },
    'div.imagesItems':{  
        'margin-left':"-50px",
        border: '1px solid $gray800'
    },
    h1:{
        fontSize:"$2xl",
        color:'$gray100'
    },
    p:{
        fontSize: '$xl',
        color: '$gray300',
        maxWidth:560,
        textAlign:"center",
        marginTop: '2rem',
        lineHeight:1.4
    },
    a:{
        marginTop:'5rem',
        display:"block",
        fontSize: '$lg',
        color: '$green500',
        textDecoration:"none",
        fontWeight: "bold",
        '&:hover': {
            color: '$green300'
        }
    }
})

export const ImageContainer = styled('div', {
    marginTop: '4rem',
    width:145,
    maxWidth:145,
    height:145,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '50%',
    padding: '0.25rem',
    display: "flex",
    alignItems: "center",
    justifyContent:"center",

    img:{
        objectFit:"cover"
    },
})