import React, { useContext } from 'react'
import {useTheme} from '@mui/material/styles'
import  InputLabel  from '@mui/material/InputLabel';
import  FormControl  from '@mui/material/FormControl';
import  Select  from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../../context/AppContext';

const range = (x) =>[...Array(x).keys()]

export default function ChangeCartItemQuanitity({item, qty}) {
    const theme = useTheme();
    const {removeAllFromCart, addBulkToCart} = useContext(AppContext)

    const handleChange=(event,item)=>{
       removeAllFromCart(item)
       addBulkToCart(Array(event.target.value).fill(item))
  
    }

  return (
    <FormControl fullWidth sx={{backgroundColor:theme.palette.background.default}}>
        <InputLabel id="qty-sel">Qty {qty}</InputLabel>
        <Select
            labelId='qty-sel'
            id="qty-sel-sel"
            value={qty}
            onChange={event=>handleChange(event, item)}
        >
            {range(qty+100).map(
                (qtySel)=>qtySel<=qty || qtySel<10 || qtySel%10===0 || qtySel%25===0
                ?
                <MenuItem key={qtySel} value={qtySel}>{qtySel}</MenuItem>
                :
                ''
            )
            }
        </Select>
    </FormControl>
  )
}
