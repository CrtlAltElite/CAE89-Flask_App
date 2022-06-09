import './App.css';
import Button from './components/Button';
import Error from './components/Error';
import NavBar from './components/NavBar';
import {getUser} from './api/apiBasicAuth';
import { CancelToken } from 'apisauce';
import LoginForm from './forms/LoginForm';
import CatForm from './forms/CatForm';
import ItemForm from './forms/ItemForm';
import apiCategory from './api/apiCategory';
import apiItem from './api/apiItem';
import CategoryBar from './components/CategoryBar';
import AdminMenu from './components/AdminMenu';
import AdminSelectItem from './components/AdminSelectItem';
import ItemBrowser from './components/ItemBrowser';
import AdminSelectCat from './components/AdminSelectCat';
import SnackBar from './components/SnackBar';
import Cart from './components/Cart/Index';
import CartPage from './views/CartPage';
import Login from './views/Login';
import ShopBrowser from './views/ShopBrowser'
import Box from '@mui/material/Box'
import {Route, Routes} from 'react-router-dom'
import AdminItem from './views/AdminItem'
import AdminCategory from './views/AdminCategory'
import {useContext} from 'react'
import { AppContext } from './context/AppContext';
import RequireAdmin from './components/RequireAdmin';
import Logout from './views/Logout';
import CheckOutSuccess from './components/CheckOutSuccess';
import Item from './components/Item';
const HomePage=()=>{return(<h1>Welcome to the Show!</h1>)}

function App() {

  const {user}=useContext(AppContext)

  return (
    <>
      <SnackBar/>
      <NavBar>
        <Box sx={{minHeight:'90vh'}}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/cart/:canceled" element={<CartPage/>}/>
            <Route path="/shop" element={<ShopBrowser/>}/>
            <Route path="/shop/:itemId" element={<Item />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/checkoutsuccess" element={<CheckOutSuccess/>}/>
            <Route path="/admincat" element={<RequireAdmin redirectTo={'/login'}><AdminCategory/></RequireAdmin>}/>
            <Route path="/adminitem" element={<RequireAdmin redirectTo={'/login'}><AdminItem/></RequireAdmin> }/>

            
            

          </Routes>
        </Box>
        {user?.is_admin ? <AdminMenu/>:''}
      </NavBar>
    </>
  );
}

export default App;
