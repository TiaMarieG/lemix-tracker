// Header.jsx
import React, { useState, useEffect } from "react";
import { vendors } from "../data/Vendors";
import bronzeCoin from "../assets/bronze.jpg";

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

   return (
      <header>
         <h2>Total:</h2>
         {Object.entries(totalCosts).map(([currency, amount]) => (
            <p key={currency}>
               
               {currency === "bronzeCost" ? (
                  <span>{amount.toLocaleString()} </span>
               ) : (
                  <span>{currency}: {amount.toLocaleString()}</span>
               )}
               {currency === "bronzeCost" && (
                  <img src={bronzeCoin} alt="Bronze Coin" className="currency-icon" />
               )}
            </p>
         ))}
      </header>
   );
};

export default Header;