// src/components/ItemInfo.jsx
import React from "react";
import { useCollection } from "../hooks/useCollection.js";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { currencyIcons } from "../data/currencies";

const ItemInfo = ({ item }) => {
   const { collectedItems, handleItemToggle } = useCollection();

   const uniqueKey = `${item.vendorName}-${item.id}`;
   const isCollected = collectedItems[uniqueKey] || false;

   const handleCheckboxChange = () => {
      handleItemToggle(item.vendorName, item.id);
   };

   return (
      <Box
         className="item-card"
         sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
         }}
      >
         <h5>
            <Link
               href={item.itemUrl}
               target="_blank"
               rel="noopener noreferrer"
               sx={{ color: "inherit" }}
            >
               {item.itemName}
            </Link>
         </h5>
         <Box className="item-costs flex-center">
            {"cost" in item && typeof item.cost === "object" ? (
               Object.entries(item.cost).map(([currency, amount]) => (
                  <Box key={currency} className="flex-center">
                     <span>{amount.toLocaleString()}</span>
                     <img
                        src={currencyIcons[currency]}
                        alt={`${currency} icon`}
                        className="currency-icon"
                     />
                  </Box>
               ))
            ) : (
               <Box className="flex-center">
                  <span>{item.bronzeCost.toLocaleString()}</span>
                  <img
                     src={currencyIcons.bronzeCost}
                     alt="Bronze Coin"
                     className="currency-icon"
                  />
               </Box>
            )}
            <Checkbox
               sx={{ ml: "auto" }}
               checked={isCollected}
               onChange={handleCheckboxChange}
            />
         </Box>
      </Box>
   );
};

export default React.memo(ItemInfo);
