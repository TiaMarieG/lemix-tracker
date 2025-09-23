// src/components/TotalCostTracker.jsx
import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import bronzeCoin from "../assets/bronze.png";
import horn from "../assets/horn.png";
import gem from "../assets/gem.png";
import fire from "../assets/fire.png";
import ore from "../assets/ore.png";

// Move currency icons outside the component to avoid re-creation on every render
const currencyIcons = {
   bronzeCost: bronzeCoin,
   horn: horn,
   gem: gem,
   fire: fire,
   ore: ore,
};

const TotalCostTracker = ({ allVendorData, collectedItems }) => {
   // Use useMemo to cache the calculated values and only re-run when dependencies change
   const { remainingCosts, progress } = useMemo(() => {
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

      const progressValue =
         totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
      return { remainingCosts: remaining, progress: progressValue };
   }, [allVendorData, collectedItems]);

   return (
      <header>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               padding: "20px",
               backgroundColor: "#1e1e1e",
               borderRadius: "8px",
               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
               mb: 2
            }}
         >
            <Typography variant="h4" gutterBottom>
               Remaining Costs:
            </Typography>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
               }}
            >
               {Object.entries(remainingCosts).map(([currency, amount]) => (
                  <Box
                     key={currency}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 2,
                        mb: 1,
                     }}
                  >
                     <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#fff" }}
                     >
                        {amount.toLocaleString()}
                     </Typography>
                     <img
                        src={currencyIcons[currency]}
                        alt={`${currency} icon`}
                        className="currency-icon"
                        style={{
                           width: "24px",
                           height: "24px",
                        }}
                     />
                  </Box>
               ))}
            </Box>
            <Box sx={{ width: "50%" }}>
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     mb: 1,
                  }}
               >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                     Progress: {`${Math.round(progress)}%`}
                  </Typography>
               </Box>
               <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                     height: "20px",
                     mx: "auto",
                     alignItems: "center",
                     borderRadius: "5px",
                     "& .MuiLinearProgress-bar": {
                        backgroundColor: "#00c800ff",
                     },
                  }}
               />
            </Box>
         </Box>
      </header>
   );
};

export default TotalCostTracker;