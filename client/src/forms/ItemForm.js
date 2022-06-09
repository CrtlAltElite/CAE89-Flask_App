import {useState} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import useCategories from '../hooks/useCategories';
import useCreateItem from '../hooks/useCreateItem';
import useEditItem from '../hooks/useEditItem';
import useDeleteItem from '../hooks/useDeleteItem';



// let categories=[{id:1,name:"Shirts"},{id:2,name:"Shoes"},{id:3, name:"Hats"}]

//Defining our yup validation
const FormSchema=Yup.object(
    {
        name:Yup.string().required(),
        desc:Yup.string().required(),
        price:Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Must be a Valid Price").required(),
        img:Yup.string().required(),
        category_id:Yup.number().integer().required()
    }
)



export default function ItemForm({ item }){

    const {categories, error} = useCategories()

    const[newItem, setNewItem]=useState({})
    const[editItem, setEditItem]=useState({})
    const[deleteItem, setDeleteItem]=useState({})

    useCreateItem(newItem)
    useEditItem(editItem, item?.id)
    useDeleteItem(deleteItem)

    const initialValues={
        name:item?.name ?? '',
        desc:item?.desc ?? '',
        price:item?.price ?? '',
        img:item?.img ?? '',
        category_id:item?.category_id??0
    }
    
    const handleSubmit=(values, resetForm)=>{
        if (item){
            setEditItem(values)
        }else{
            setNewItem(values)
        }
        console.log(values)
        resetForm(initialValues)
    }
    
    const handleDelete=()=>{
        setDeleteItem(item)
    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id="name"
                name="name"
                fullWidth
                sx={{mb:2, mt:2}}
                label="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}            
            />
            <TextField
                id="desc"
                name="desc"
                fullWidth
                sx={{mb:2}}
                label="desc"
                placeholder="Description"
                value={formik.values.desc}
                onChange={formik.handleChange}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helperText={formik.touched.desc && formik.errors.desc}            
            />
            <TextField
                id="price"
                name="price"
                fullWidth
                sx={{mb:2}}
                label="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}            
            />
            <TextField
                id="img"
                name="img"
                fullWidth
                sx={{mb:2}}
                label="Image URL"
                placeholder="img"
                value={formik.values.img}
                onChange={formik.handleChange}
                error={formik.touched.img && Boolean(formik.errors.img)}
                helperText={formik.touched.img && formik.errors.img}            
            />
            <FormControl fullWidth>
                <InputLabel id="category-label-id">Category</InputLabel>
                <Select
                    labelId="category-label-id"
                    id="category-id"
                    value={formik.values.category_id}
                    name="category_id"
                    placeholder="Category"
                    label="Category"
                    onChange={formik.handleChange}
                    error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                >
                    <MenuItem value={0}><em>None</em></MenuItem>

                {categories?.map((category)=>(
                    <MenuItem key={category.id} value={category.id}>{category.name} | {category.id}</MenuItem>
                )
                )}
                </Select>
                {error}
                <FormHelperText>{formik.touched.category_id && formik.errors.category_id}</FormHelperText>
            </FormControl>
            <Button type="submit" sx={{width:"100%",my:1}}>{item?"Edit Item":"Create Item"}</Button>
            <Button onClick={()=>{handleDelete()}} sx={{width:"100%",my:1}}>Delete</Button>

        </form>
    )

}