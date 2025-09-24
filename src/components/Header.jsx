import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import githubLogo from "../assets/github.png";
import coffeeCup from "../assets/coffee.png";

const Header = () => {
   return (
      <AppBar 
         position="static" 
         sx={{ 
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            boxShadow: 4 
         }}
      >
         <Toolbar>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
               <Link
                  href="https://github.com/TiaMarieG/lemix-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 2 }}
               >
                  <img
                     src={githubLogo}
                     alt="GitHub"
                     style={{ height: "32px", width: "32px" }}
                  />
               </Link>
               <Link
                  href="https://buymeacoffee.com/mittoa"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <img
                     src={coffeeCup}
                     alt="Buy Me A Coffee"
                     style={{ height: "32px", width: "32px" }}
                  />
               </Link>
            </Box>
            <Typography
               variant="h4"
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

export default React.memo(Header);