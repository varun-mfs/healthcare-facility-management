import {
  AppBar, Box, Divider, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { router } from "../routes/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logout } from "@mui/icons-material";
import { useLogOut } from "../features/authentication/hooks";
import { FirebaseAuth } from "../lib/firebase";
import { toast } from 'react-toastify';
import { TOAST_MESSAGES } from "../constants";
import { LoadingSpinner } from "../shared/components";

const drawerWidth = 241;

function Root() {
  // get all the routes from the router
  const routes = router.routes[0].children;

  // for highlight selected option
  const location = useLocation();
  // console.log("🚀 ~ file: Root.jsx:19 ~ Root ~ location:", location)

  // for displaying selected option name in appbar
  const currentRoute = routes.find(route => route.path ? "/" + route.path === location.pathname : location.pathname === "/")
  // console.log("🚀 ~ file: Root.jsx:23 ~ Root ~ currentRoute:", currentRoute)

  // Logout user
  const { logOut, loading, error } = useLogOut();

  const navigate = useNavigate();

  // Retrieve and monitor the authentication state from Firebase
  const [user, authStateLoading, authStateError] = useAuthState(FirebaseAuth);


  const handleLogOut = async () => {
    const success = await logOut();
    if (success) {
      toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS)
      navigate("/login"); // redirect to login after logout success
    } else {
      toast.success(TOAST_MESSAGES.LOGOUT_FAILURE)
    }
  }

  if (loading || authStateLoading) {
    return <LoadingSpinner />
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Right top bar */}
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography component="p" variant="h6">
            {/* Vcare Facility */}
            {currentRoute.name}
          </Typography>
          {/* TODO: show logged in user name (and info tab here ??) */}
        </Toolbar>
      </AppBar>
      {/* Left drawer menu */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {routes.map((route) => {
            // TODO: show appointment
            if (route.name.includes('Appointments') && import.meta.env.VITE_HIDE_APPOINTMENT === 'true') {
              return null
            }
            return <ListItem key={route.id} disablePadding>
              <ListItemButton
                selected={route.path && location.pathname === "/" + route.path}
                LinkComponent={Link}
                to={route.path ? route.path : "/"}>
                <ListItemIcon>
                  {/* {route.id % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {<route.icon />}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          }
          )}
          {/* Logout button */}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut}>
              <ListItemIcon><Logout></Logout></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Root;