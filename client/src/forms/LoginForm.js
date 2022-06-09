import React, {useContext, useState} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
import { AppContext } from '../context/AppContext';
import Error from '../components/Error';
import useLogin from '../hooks/useLogin';

//Defining our yup validation
const FormSchema=Yup.object(
    {
        email:Yup.string().email("Must be a valid e-mail format").required(),
        password:Yup.string().required()
    }
)

const initialValues={
    email:'',
    password:''
}


export default function LoginForm(){
    const {setUser} = useContext(AppContext);
    const [loginCreds, setLoginCreds] = useState({});
    const [error, setError] = useState('')
    
    
    useLogin(loginCreds, setLoginCreds, setError, setUser)

    const handleSubmit=(values)=>{
        console.log(values)
        setLoginCreds(values)
    }




    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values)=>{handleSubmit(values)}
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id="email"
                name="email"
                fullWidth
                sx={{mb:2, mt:2}}
                label="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}            
            />

            <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                sx={{mb:2}}
                label="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}            
            />

            <Button type="submit" sx={{width:"100%"}}>Login</Button>
            <Error>{error}</Error>
        </form>
    )

}