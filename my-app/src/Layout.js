import * as React from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const drawerWidth = 240;

const navItems = ["Values", "Calculator"];

function Layout(props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (item) => {
    if (item == "Values") {
      navigate("/");
    } else if (item == "Calculator") {
      navigate("calculator");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Car App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item}
                onClick={() => {
                  handleClick(item);
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ background: "#f8f9fa", color: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Car App
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "black" }}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ p: { xs: 0, md: 2 }, background: "#e7f3ff", width: "100%" }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#212529",
          paddingX: { xs: 3, md: 20 },
          paddingY: { xs: 5, md: 10 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography
              sx={{ fontWeight: "bold", color: "white" }}
              variant="h5"
              component="div"
            >
              Car App
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              sx={{ fontWeight: "bold", ml: 2, color: "white" }}
              variant="h5"
              component="div"
            >
              Links
            </Typography>

            <List>
              <ListItem>
                <ListItemButton component="a" href="/">
                  <ListItemText primary="Values" sx={{ color: "#0d6efd" }} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component="a" href="/calculator">
                  <ListItemText
                    primary="Calculator"
                    sx={{ color: "#0d6efd" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              sx={{ fontWeight: "bold", ml: 2, color: "white" }}
              variant="h5"
              component="div"
            >
              Legals
            </Typography>

            <List>
              <ListItem>
                <ListItemButton component="a" href="#">
                  <ListItemText
                    primary="Privacy Policy"
                    sx={{ color: "#0d6efd" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component="a" href="#">
                  <ListItemText
                    primary="Terms & Conditions"
                    sx={{ color: "#0d6efd" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
