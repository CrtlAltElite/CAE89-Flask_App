import {useContext} from 'react'
import { AppContext } from '../context/AppContext'
import {Navigate} from 'react-router-dom'

export default function RequireAdmin({children, redirectTo}) {
const {user} = useContext(AppContext)

    return user.is_admin && user.token ? children : <Navigate to={redirectTo}/>

}
