// src/components/VendorInfo.jsx
import React from "react";
import { useCollection } from "../hooks/useCollection.js";
import ItemInfo from "./ItemInfo";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

const VendorInfo = ({ vendorName, vendorCategory, vendorData }) => {
   const { collectedItems } = useCollection();

   const totalItems = vendorData.length;
   const collectedCount = vendorData.filter((item) => {
      const uniqueKey = `${vendorName}-${item.id}`;
      return !!collectedItems[uniqueKey];
   }).length;

   return (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%"
               }}
            >
               <Typography variant="h6">{vendorName}</Typography>
               <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                  {vendorCategory}
               </Typography>
               <Typography variant="body2" sx={{ color: "#00c800ff", mt: 0.5 }}>
                  {collectedCount}/{totalItems} Collected
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails>
            <div className="item-list">
               {vendorData.map((item) => (
                  <ItemInfo
                     key={item.id}
                     item={{ ...item, vendorName: vendorName }}
                  />
               ))}
            </div>
         </AccordionDetails>
      </Accordion>
   );
};

export default React.memo(VendorInfo);
