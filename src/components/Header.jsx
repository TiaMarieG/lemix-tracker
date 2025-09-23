import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
   return (
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
         <Toolbar>
            <Typography
               variant="h6"
               component="div"
               sx={{ flexGrow: 1, textAlign: "center" }}
            >
               Lemix-Tracker
            </Typography>
         </Toolbar>
      </AppBar>
   );
};

export default Header;