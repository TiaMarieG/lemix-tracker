// src/components/TotalCostTracker.jsx
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import bronzeCoin from "../assets/bronze.png";
import horn from "../assets/horn.png";
import gem from "../assets/gem.png";
import fire from "../assets/fire.png";
import ore from "../assets/ore.png";

const TotalCostTracker = ({ allVendorData, collectedItems }) => {
   const [remainingCosts, setRemainingCosts] = useState({});
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      let remaining = {};
      let completedCount = 0;
      const totalItems = allVendorData.length;

      allVendorData.forEach((item) => {
         const uniqueKey = `${item.vendorName}-${item.id}`;
         const isCollected = collectedItems[uniqueKey];

         if (isCollected) {
            completedCount++;
         } else {
            const itemCosts =
               "cost" in item && typeof item.cost === "object"
                  ? item.cost
                  : { bronzeCost: item.bronzeCost };

            for (const currency in itemCosts) {
               if (
                  Object.prototype.hasOwnProperty.call(itemCosts, currency) &&
                  itemCosts[currency] !== undefined
               ) {
                  const amount = itemCosts[currency];
                  remaining[currency] = (remaining[currency] || 0) + amount;
               }
            }
         }
      });

      setRemainingCosts(remaining);
      setProgress(totalItems > 0 ? (completedCount / totalItems) * 100 : 0);
   }, [allVendorData, collectedItems]);

   const currencyIcons = {
      bronzeCost: bronzeCoin,
      horn: horn,
      gem: gem,
      fire: fire,
      ore: ore,
   };

   return (
      <header>
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            <h2>Remaining:</h2>
            {Object.entries(remainingCosts).map(([currency, amount]) => (
               <Box
                  key={currency}
                  sx={{ display: "flex", alignItems: "center", ml: 2 }}
               >
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                     {amount.toLocaleString()}
                  </Typography>
                  <img
                     src={currencyIcons[currency]}
                     alt={`${currency} icon`}
                     className="currency-icon"
                  />
               </Box>
            ))}
         </Box>
         <Box sx={{ width: "50%", mb: 2, alignContent: "center", mx: "auto" }}>
            <LinearProgress variant="determinate" value={progress} />
         </Box>
      </header>
   );
};

export default TotalCostTracker;
