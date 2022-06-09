import { Typography } from '@mui/material'
import {useContext, useEffect} from 'react'
import Cart from '../components/Cart/Index'
import { AppContext } from '../context/AppContext'
import {useParams} from 'react-router-dom';

export default function CartPage() {    
    const {cart, setAlert} = useContext(AppContext)
    const {canceled}=useParams()
    useEffect(
      ()=>{
        if(canceled){
          setAlert({msg:'Checkout Canceled', cat:'error'})
        }
      }
    )

    if (cart.length<=0){
        return(
            <Typography variant="h3">Your Cart Is Empty</Typography>
        )
    }
  return (
    <>
        <Typography variant="h3">Your Cart</Typography>
        <Cart/>

    </>
  )
}
