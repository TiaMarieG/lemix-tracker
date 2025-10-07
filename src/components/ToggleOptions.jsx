// src/components/ToggleOptions.jsx
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useCollection } from "../hooks/useCollection";

const ToggleOptions = ({
   isToggled,
   onToggle,
   hideCollected,
   onHideToggle,
   showBronzeCost,
   onShowBronzeCostToggle,
}) => {
   const { showLemixOnly, setShowLemixOnly } = useCollection();

   return (
      <Accordion
         sx={{
            mb: 2,
            backgroundColor: "background.paper",
            backgroundImage: "none",
         }}
      >
         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "100%", textAlign: "center" }}>
               Options
            </Typography>
         </AccordionSummary>
         <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
               control={
                  <Switch checked={hideCollected} onChange={onHideToggle} />
               }
               label="Hide Collected"
            />
            <FormControlLabel
               control={
                  <Switch
                     checked={showLemixOnly}
                     onChange={() => setShowLemixOnly((prev) => !prev)}
                  />
               }
               label="Show 'Lemix Only' Items"
            />
            <FormControlLabel
               control={<Switch checked={isToggled} onChange={onToggle} />}
               label="Sort Vendors Alphabetically"
            />
            <FormControlLabel
               control={
                  <Switch
                     checked={showBronzeCost}
                     onChange={onShowBronzeCostToggle}
                  />
               }
               label="Show Vendor Remaining/Total Bronze"
            />
         </AccordionDetails>
      </Accordion>
   );
};

export default ToggleOptions;