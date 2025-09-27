// src/components/VendorInfo.jsx
import React, { useState, useMemo } from "react";
import { useCollection } from "../hooks/useCollection.js";
import { currencyIcons } from "../data/currencies";
import ItemInfo from "./ItemInfo";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

const VendorInfo = ({
   vendorName,
   vendorCategory,
   vendorData,
   hideCollected,
   showBronzeCost,
}) => {
   const { collectedItems } = useCollection();
   const [expanded, setExpanded] = useState(false);

   const handleExpansionChange = (event, isExpanded) => {
      setExpanded(isExpanded);
   };

   const { totalBronze, remainingBronze } = useMemo(() => {
      let total = 0;
      let remaining = 0;

      const getBronzeCost = (item) => {
         if (
            item.cost &&
            typeof item.cost === "object" &&
            "bronzeCost" in item.cost
         ) {
            return item.cost.bronzeCost;
         }
         return typeof item.bronzeCost === "number" ? item.bronzeCost : 0;
      };

      vendorData.forEach((item) => {
         const cost = getBronzeCost(item);
         total += cost;

         const uniqueKey = `${vendorName}-${item.id}`;
         if (!collectedItems[uniqueKey]) {
            remaining += cost;
         }
      });

      return { totalBronze: total, remainingBronze: remaining };
   }, [vendorData, collectedItems, vendorName]);

   const filteredItems = useMemo(() => {
      if (!hideCollected) {
         return vendorData;
      }
      return vendorData.filter((item) => {
         const uniqueKey = `${vendorName}-${item.id}`;
         return !collectedItems[uniqueKey];
      });
   }, [vendorData, collectedItems, hideCollected, vendorName]);

   const totalItems = vendorData.length;
   const collectedCount = vendorData.filter((item) => {
      const uniqueKey = `${vendorName}-${item.id}`;
      return !!collectedItems[uniqueKey];
   }).length;

   return (
      <Accordion expanded={expanded} onChange={handleExpansionChange}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
               position: "sticky",
               top: 0,
               zIndex: 10,
               backgroundColor: "background.paper",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
               }}
            >
               <Typography variant="h5">{vendorName}</Typography>
               <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                  {vendorCategory}
               </Typography>

               <Typography variant="body2" sx={{ color: "#00c800ff", mt: 0.5 }}>
                  {collectedCount}/{totalItems} Collected
               </Typography>
               {showBronzeCost && totalBronze > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                     <Typography variant="body2" sx={{ color: "#00c800ff" }}>
                        {`${remainingBronze.toLocaleString()} / ${totalBronze.toLocaleString()}`}
                     </Typography>
                     <img
                        src={currencyIcons.bronzeCost}
                        alt="Bronze Coin"
                        className="currency-icon"
                        style={{ margin: 4, width: 16, height: 16 }}
                     />
                     <Typography variant="body2" sx={{ color: "#00c800ff" }}>
                        Remaining
                     </Typography>
                  </Box>
               )}
            </Box>
         </AccordionSummary>
         <AccordionDetails sx={{ pr: 0.5 }}>
            <div className="item-list">
               {filteredItems.map((item) => (
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
