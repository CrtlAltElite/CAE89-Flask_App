import {useState} from 'react'
import CategoryBar from '../components/CategoryBar'
import ItemBrowser from '../components/ItemBrowser'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function ShopBrowser() {
    const [category, setCat]=useState()

  return (
  <>
    <Typography variant='h3'>Shop Our Wares</Typography>
    <Box sx={{display:'flex', justifyContent:"center", alignContent:"center", width:'100%', mb:2}}>
        <CategoryBar handleClick={(cat)=>{setCat(cat)}}/>
    </Box>

    <ItemBrowser category_id={category?.id}/>
  </>
  )
}
