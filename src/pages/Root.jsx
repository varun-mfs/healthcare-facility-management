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
  console.log("🚀 ~ file: Root.jsx:33 ~ Root ~ user:", user)

  const handleLogOut = async () => {
    console.log("INSIDE handleLogOut")
    const success = await logOut();
    if (success) {
      alert('You have logged out!');
      // TODO: redirect to login page after logged out successfully
      navigate("/login");
    }
  }

  // console.log("first", routes)
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
          {routes.map((route) => (
            <ListItem key={route.id} disablePadding>
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
          ))}
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