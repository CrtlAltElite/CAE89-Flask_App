import {useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'

export default function CheckOutSuccess() {
    const {emptyCart} = useContext(AppContext)

    useEffect(
        ()=>{emptyCart()},[emptyCart]
    )
  return (
    <div>
        Thanks for shopping with us today<br/>
        If we sent back info from out flask App <br/>
        we could show it here. Like an order Number or and Invoice
    </div>
  )
}
