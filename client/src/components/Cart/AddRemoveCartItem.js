import {useContext} from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import {AppContext} from '../../context/AppContext';

export default function AddRemoveCartItem({item}) {
  const {addToCart, removeFromCart, removeAllFromCart}=useContext(AppContext)

  return (
    <ButtonGroup sx={{margin:"auto"}}>
        <IconButton key="delete" onClick={()=>{removeAllFromCart(item)}}>
            <DeleteForeverTwoToneIcon fontSize="small"/>
        </IconButton>
        <IconButton key="rm" onClick={()=>{removeFromCart(item)}}>
            <RemoveCircleTwoToneIcon fontSize="small"/>
        </IconButton>
        <IconButton key="add" onClick={()=>{addToCart(item)}}>
            <AddCircleTwoToneIcon fontSize="small"/>
        </IconButton>
    </ButtonGroup>
  )
}
