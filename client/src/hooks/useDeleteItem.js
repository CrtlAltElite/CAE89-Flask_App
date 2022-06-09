import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiItem from '../api/apiItem'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom';

export default function useDeleteItem(item) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            if (item?.name){
                (async()=>{
                    response = await apiItem.del(user.token, item.id, source.token)
                    if (response){
                        setAlert({msg:`Item: ${item.name} Editted`,cat:'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg:`Please reauthorize you account`,cat:'warning'})
                        navigate('/')
                    }
                })()
            }
            return ()=>{source.cancel()}
        },[item, user.token]
    )
}
