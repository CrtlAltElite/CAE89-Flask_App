import { LocalGroceryStoreTwoTone, StorefrontTwoTone } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import getRandomInt from '../helpers';
import ThemeSwitch from './ThemeSwitch';
import {Link} from 'react-router-dom';
import RegLink from '@mui/material/Link';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {user, cart} = useContext(AppContext)

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{mr:3}}>
            <Link to='/'>
              <img height='45px' alt="Kanye Bear Logo" className='p2' src="https://res.cloudinary.com/cae67/image/upload/v1653415677/kanyebear_g0jzgb.png"/>
            </Link>
          </Box>
          <Typography sx={{ flexGrow: 1}} variant="h6" noWrap component="div">
            NFTY
          </Typography>
        <Box sx={{ flexGrow: 0,  }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name ?? "Please Login"} src={user?.icon ? `https://avatars.dicebear.com/api/avataaars/${user.icon}.svg`:`https://avatars.dicebear.com/api/avataaars/${getRandomInt(0,1000)}.svg`}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <Link to='/logout'  style={{textDecoration:'none', color:'black'}}>
                    Logout
                  </Link>
                  </Typography>
                </MenuItem>
                :
                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                <Link to='/login' style={{textDecoration:'none', color:'black'}}>
                  Login
                </Link>
                </Typography>
              </MenuItem>
            }
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{color:"white", backgroundImage:"linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/cae67/image/upload/v1653414643/sparkle_dcokkt.jpg')",     backgroundSize: 'cover', flexGrow: 1}}>
        <DrawerHeader>
          Paths of Enlightenment
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"white"}}/> : <ChevronLeftIcon style={{color:"white"}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            [{label:'Cart',path:'/cart', icon:<Badge badgeContent={cart?.length} color="primary"><LocalGroceryStoreTwoTone style={{color:'white'}}/></Badge>},
            {label:'Store',path:'/shop', icon:<StorefrontTwoTone style={{color:'white'}}/>}
          ].map((navItem, index) => (
            <ListItem key={navItem.label} disablePadding sx={{ display: 'block', ml:2, mb:2 }}>
              <Link to={navItem.path} style={{display:"flex", color:'inherit', textDecoration:'none'}}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    {navItem.icon}
                </ListItemIcon>
                <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
              </Link>
            </ListItem>
          ))}
          <ListItem button key={"Social"}>
              <RegLink href="/index" color="inherit" underline="none" sx={{display:"flex"}}>
                <ListItemIcon>
                  <ConnectWithoutContactIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={"Social"} />
              </RegLink>
            </ListItem>

        </List>
        {open?
       <ListItem sx={{position:"absolute", bottom:"0px", alignContent:"center", justifyContent:"center" }}>
            <ThemeSwitch/>
       </ListItem>
       :
       ''
        }
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
