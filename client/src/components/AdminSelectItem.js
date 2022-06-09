import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import ItemForm from '../forms/ItemForm';
import useItems from '../hooks/useItems';
import Error from './Error';


export default function AdminSelectItem() {
    const [item, setItem] =useState('')
    const {items, error} = useItems()

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value==='default'){
            setItem('')
            return
        }
        setItem(JSON.parse(event.target.value))
    }

  return (
    <>
        <FormControl fullWidth>
            <InputLabel id="item-label">Item</InputLabel>
            <Select
                labelId="item-label"
                label="Item"
                name="item_id"
                placeholder="Item"
                value={item?JSON.stringify(item):'default'}
                onChange={(event)=>handleChange(event)}
            >
                <MenuItem value="default"><em>Select Item To Edit</em></MenuItem>
                {items?.map(
                    (i)=>(
                        <MenuItem key={i.id} value={JSON.stringify(i)}>{i.name}</MenuItem>
                    )
                )}
            </Select>
            <Error>{error}</Error>
        </FormControl>

        {item ? 
            <>
                <Typography sx={{p:4}} variant="h5">
                    Edit {item.name}
                </Typography>
                <ItemForm item={item}/>
            </>
            :   
            <>
                <Typography sx={{p:4}} variant="h5">
                    Create 
                </Typography>
                <ItemForm/>
            </>
            }
    </>
  )
}
