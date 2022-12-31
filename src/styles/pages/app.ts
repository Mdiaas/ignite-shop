import { styled } from "..";

export const Container = styled('div', {
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center",
    minHeight:"100vh"
})

export const Header = styled('header', {
    padding: '2rem',
    width:'100%',
    maxWidth: 1180,
    margin: '0 auto',
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",

    div:{
        backgroundColor: "$gray800",
        color:"$gray500",
        padding: "0.5rem",
        borderRadius:8,
        cursor:"pointer"
    }
})