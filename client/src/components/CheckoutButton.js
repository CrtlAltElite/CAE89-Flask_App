import {useState, useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import Button from './Button'
import apiStripe from '../api/apiStripe'
import {CancelToken} from 'apisauce'
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';

export default function CheckoutButton() {
    const [checkoutInfo, setCheckoutInfo] =useState()
    const {cart, user}=useContext(AppContext)

    useEffect(
        ()=>{
            let source
            const makeSale=async()=>{
                source=CancelToken.source()
                if (checkoutInfo){
                    await apiStripe.postTransaction(user.token, checkoutInfo, source.token)
                }
            }
            makeSale()
            return ()=>{
                source.cancel()
            }
        }
        ,[checkoutInfo, user.token]
    )

  return (
    <Button onClick={()=>{setCheckoutInfo({cart,user})}} startIcon={<PointOfSaleTwoToneIcon/>}>Checkout</Button>
  )
}
