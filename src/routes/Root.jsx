import {
  AppBar, Box, Divider, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, useLocation } from "react-router-dom";
import { router } from "../common/router";

const drawerWidth = 241;

function Root() {
  // get all the routes from the router
  const routes = router.routes[0].children;

  // for highlight selected option
  const location = useLocation();
  // console.log("🚀 ~ file: Root.jsx:19 ~ Root ~ location:", location)

  // for displaying selected option name in appbar
  const currentRoute = routes.find(route => route.path ? "/" + route.path === location.pathname : location.pathname === "/")
  console.log("🚀 ~ file: Root.jsx:23 ~ Root ~ currentRoute:", currentRoute)

  console.log("first", routes)
  return (
    <Box sx={{ display: "flex" }}>
      {/* Right top bar */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography component="p" variant="h6">
            {/* Vcare Facility */}
            {currentRoute.name}
          </Typography>
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
                  {route.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography> */}
      </Box>
    </Box>
  )
}

export default Root;