// src/components/TotalCostTracker.jsx
import { useMemo } from "react";
import { useCollection } from "../hooks/useCollection.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { currencyIcons } from "../data/currencies";

const TotalCostTracker = () => {
   const { allVendorData, collectedItems } = useCollection();

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
               if (Object.prototype.hasOwnProperty.call(itemCosts, currency)) {
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
      <Box
         sx={{
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "8px",
            mb: 2,
         }}
      >
         <Typography variant="h4" gutterBottom>
            Remaining Costs:
         </Typography>
         <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
         >
            {Object.entries(remainingCosts).map(([currency, amount]) => (
               <Box
                  key={currency}
                  className="flex-center"
                  sx={{ ml: 2, mb: 1 }}
               >
                  <Typography variant="h5">
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
         <Box sx={{ width: "50%", mx: "auto", mt: 2 }}>
            <Typography variant="h6" align="center">
               Progress: {`${Math.round(progress)}%`}
            </Typography>
            <LinearProgress
               variant="determinate"
               value={progress}
               sx={{
                  height: "20px",
                  borderRadius: "5px",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#00c800ff" },
               }}
            />
         </Box>
      </Box>
   );
};

export default TotalCostTracker;
