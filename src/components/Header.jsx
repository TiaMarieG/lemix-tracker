import React, { useState, useEffect } from "react";
import { vendors } from "../data/Vendors";
import bronzeCoin from "../assets/bronze.png";
import horn from "../assets/horn.png";
import gem from "../assets/gem.png";
import fire from "../assets/fire.png";
import ore from "../assets/ore.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
   const [totalCosts, setTotalCosts] = useState({});

   useEffect(() => {
      const allVendorData = vendors.flatMap((vendor) => vendor.data);

      const newTotalCosts = allVendorData.reduce((totals, item) => {
         let itemCosts = {};

         if ("cost" in item && typeof item.cost === "object") {
            itemCosts = item.cost;
         } else if ("bronzeCost" in item) {
            itemCosts = { bronzeCost: item.bronzeCost };
         }

         for (const currency in itemCosts) {
            if (
               Object.prototype.hasOwnProperty.call(itemCosts, currency) &&
               itemCosts[currency] !== undefined
            ) {
               const amount = itemCosts[currency];
               totals[currency] = (totals[currency] || 0) + amount;
            }
         }

         return totals;
      }, {});

      setTotalCosts(newTotalCosts);
   }, []);

   const currencyIcons = {
      bronzeCost: bronzeCoin,
      horn: horn,
      gem: gem,
      fire: fire,
      ore: ore,
   };

   return (
      <header>
         <Box sx={{ display: "flex", alignItems: "center" }}>
            <h2>Total:</h2>
            {Object.entries(totalCosts).map(([currency, amount]) => (
               <Box key={currency} sx={{ display: "flex", alignItems: "center", ml: 2 }}>
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
      </header>
   );
};

export default Header;