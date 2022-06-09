import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiCategory from '../api/apiCategory'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom';
export default function useEditCategory(category, categoryID) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            if (category){
                (async()=>{
                    response = await apiCategory.put(user.token, categoryID, category.name, source.token)
                    if (response){
                        setAlert({msg:`Category: ${category} Editted`,cat:'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg:`Please reauthorize you account`,cat:'warning'})
                        navigate('/')
                    }
                })()
            }
            return ()=>{source.cancel()}
        },[category, user.token]
    )
}
