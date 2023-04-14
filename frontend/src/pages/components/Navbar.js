import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  IconButton,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" top={0} right={0} height="60px">
      <Box sx={{display:"flex"}}>
        <Toolbar disableGutters sx={{display:"flex", columnGap: 2, backgroundColor: "#cd1f32", width: "100%"}}>
        <img src={"univalle_logo.jpg"} alt="logo" height="60px"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Escuela de Ingeniería Eléctrica y Electrónica

          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
