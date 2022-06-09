import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiCategory from '../api/apiCategory'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom';

export default function useDeleteCategory(categoryID) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            if (categoryID){
                (async()=>{
                    response = await apiCategory.del(user.token, categoryID, source.token)
                    if (response){
                         setAlert({msg:`Category: ${categoryID} Deleted`, cat:'success'})
                    }else if(response === false && response !== undefined){
                         setAlert({msg:`Please reauthorize you account`, cat:'warning'})
                         navigate('/')
                    }
                })()
            }
            return ()=>{source.cancel()}
        },[categoryID, user.token]
    )
}
