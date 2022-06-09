import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import CatForm from '../forms/CatForm';
import useCategories from '../hooks/useCategories';
import Error from '../components/Error';

export default function AdminSelectCat() {
    const [cat, setCat] =useState('')
    const {categories, error} = useCategories();

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value==='default'){
            setCat('')
            return
        }
        setCat(JSON.parse(event.target.value))
    }

  return (
    <>
        <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                label="Category"
                name="category_id"
                placeholder="category"
                value={cat?JSON.stringify(cat):'default'}
                onChange={(event)=>handleChange(event)}
            >
                <MenuItem value="default"><em>Select Category To Edit</em></MenuItem>
                {categories?.map(
                    (category)=>(
                        <MenuItem key={category.id} value={JSON.stringify(category)}>{category.name}</MenuItem>
                    )
                )}
            </Select>
            <Error>{error}</Error>
        </FormControl>

        {cat ? 
            <>
                <Typography sx={{p:4}} variant="h5">
                    Edit {cat.name}
                </Typography>
                <CatForm category={cat}/>
            </>
            :   
            <>
                <Typography sx={{p:4}} variant="h5">
                    Create 
                </Typography>
                <CatForm/>
            </>
            }
    </>
  )
}
