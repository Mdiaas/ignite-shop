import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor:'$green300',
  borderRadius: 4,
  border:0,
  padding: '8px 4px',
  cursor: 'pointer',
  '&:hover':{
    filter: 'brightness(0.8)'
  }
})
export default function Home() {
  return (
    <Button>aaaaaaaaaaaa</Button>
  )
}
