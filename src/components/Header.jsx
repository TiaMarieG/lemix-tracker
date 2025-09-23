import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";


import githubLogo from "../assets/github.png";
import coffeeCup from "../assets/coffee.png";

const Header = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
         <Toolbar>
            {/* Left Side: Menu Button */}
            <Box
               sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
            >
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
               >
                  <MenuIcon />
               </IconButton>
               <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                     vertical: "top",
                     horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                     vertical: "top",
                     horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
               >
                  <MenuItem onClick={handleClose}>
                     <Link
                        href="https://github.com/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           textDecoration: "none",
                           color: "inherit",
                        }}
                     >
                        <img
                           src={githubLogo}
                           alt="GitHub"
                           style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                        Source Code
                     </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                     <Link
                        href="https://www.buymeacoffee.com/your-page"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           textDecoration: "none",
                           color: "inherit",
                        }}
                     >
                        <img
                           src={coffeeCup}
                           alt="Buy Me A Coffee"
                           style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                        Support Me
                     </Link>
                  </MenuItem>
               </Menu>
            </Box>

            <Typography
               variant="h6"
               component="div"
               sx={{ flex: 1, textAlign: "center" }}
            >
               Lemix-Tracker
            </Typography>

            <Box sx={{ flex: 1 }} />
         </Toolbar>
      </AppBar>
   );
};

export default Header;
