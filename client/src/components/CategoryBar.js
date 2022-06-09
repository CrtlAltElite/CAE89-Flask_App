import React, {useState} from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import useCategories from '../hooks/useCategories';
import Error from './Error';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
// const categories=[{id:1, name:"Shoes"},{id:2, name:"Pants"},{id:3, name:"Shirts"}]

export default function CategoryBar({handleClick=()=>{}}) {
    const [actCat, setActCat] = useState({});

    const {categories, error} = useCategories();

    const handleActCat=(cat)=>{
      if (actCat===cat){
        setActCat({})
      }else{
        setActCat(cat)
      }
    }

    
  if (error){
      return (
        <Box sx={{display:"flex"}}>
        <Error>{error}</Error>
      </Box>
    )
  }
  
  if(!categories){
    return(
    <Box sx={{display:"flex"}}>
      <CircularProgress/>
    </Box>
    )
  }


  return (
    <Stack direction="row" spacing={1}>
      {categories.map((cat)=>(
          cat===actCat?
            <Chip 
                key={cat.id} 
                size="small" 
                color="primary"  
                label={cat.name} 
                onClick={()=>{handleActCat(cat); handleClick(cat)}} />
          :
            <Chip 
                variant="outlined" 
                size="small" 
                color="primary" 
                key={cat.id} 
                label={cat.name} 
                onClick={()=>{handleActCat(cat); handleClick(cat)}} />
          )) }
    </Stack>
  );
}

