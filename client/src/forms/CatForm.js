import {useState} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
import useCreateCategory from '../hooks/useCreateCategory';
import useEditCategory from '../hooks/useEditCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';


//Defining our yup validation
const FormSchema=Yup.object(
    {
        name:Yup.string().required(),
    }
)



export default function CatForm({ category }){
    const [newCat, setNewCat]=useState('')
    const [editCat, setEditCat]=useState('')
    const [deleteCat, setDeleteCat]=useState(0)

    useCreateCategory(newCat)
    useEditCategory(editCat, category?.id)
    useDeleteCategory(deleteCat)


    const initialValues={
        name:category?.name ?? '',
    }
    
    const handleSubmit=(values, resetForm)=>{
        if (category){
            setEditCat(values)
        }else{
            setNewCat(values)
        }
        console.log(values)
        resetForm(initialValues)
    }

    const handleDelete=()=>{
        setDeleteCat(category?.id)
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
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}            
            />

            <Button type="submit" sx={{width:"100%", my:1}}>{category?"Edit Category":"Create Cat"}</Button>
            <Button color="error" onClick={()=>handleDelete()} sx={{width:"100%", my:1}}>Delete</Button>

        </form>
    )

}