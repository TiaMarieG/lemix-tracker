// src/components/TotalCostTracker.jsx
import { useMemo } from "react";
import { useCollection } from "../hooks/useCollection.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { currencyIcons } from "../data/currencies";

const TotalCostTracker = () => {
   const { allVendorData, collectedItems } = useCollection();

   const { bronzeCost, otherCostRows, progress } = useMemo(() => {
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
                  remaining[currency] =
                     (remaining[currency] || 0) + itemCosts[currency];
               }
            }
         }
      });

      // Separate bronze from the other costs
      const { bronzeCost, ...otherCosts } = remaining;
      const otherCostsArray = Object.entries(otherCosts);

      // Group the other costs into pairs
      const rows = [];
      for (let i = 0; i < otherCostsArray.length; i += 2) {
         rows.push(otherCostsArray.slice(i, i + 2));
      }

      const progressValue =
         totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

      return { bronzeCost, otherCostRows: rows, progress: progressValue };
   }, [allVendorData, collectedItems]);

   return (
      <Box
         sx={{
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "8px",
            mb: 2
         }}
      >
         <Typography variant="h4" gutterBottom align="center">
            Remaining Costs:
         </Typography>

         {bronzeCost > 0 && (
            <Box
               className="flex-center"
               sx={{ justifyContent: "center", mb: 2 }}
            >
               <Typography variant="h5">
                  {bronzeCost.toLocaleString()}
               </Typography>
               <img
                  src={currencyIcons.bronzeCost}
                  alt="Bronze Coin icon"
                  className="currency-icon"
               />
            </Box>
         )}

         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center"
            }}
         >
            {otherCostRows.map((row, index) => (
               <Box
                  key={index}
                  sx={{
                     display: "flex",
                     justifyContent: "space-around",
                     width: { xs: "80%", sm: "60%" },
                     mb: 1,
                  }}
               >
                  {row.map(([currency, amount]) => (
                     <Box key={currency} className="flex-center">
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
            ))}
         </Box>

         <Box sx={{ width: { xs: "90%", sm: "50%" }, mx: "auto", mt: 2 }}>
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
