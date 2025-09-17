// Header.jsx
import { useState, useEffect } from "react";
import { vendors } from "../data/Vendors";
import bronzeCoin from "../assets/bronze.png";
import horn from "../assets/horn.png";
import gem from "../assets/gem.png";
import fire from "../assets/fire.png";
import ore from "../assets/ore.png";

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
         <h2>Total:</h2>
         {Object.entries(totalCosts).map(([currency, amount]) => (
            <p key={currency}>
               {amount.toLocaleString()}
               <img
                  src={currencyIcons[currency]}
                  alt={`${currency} icon`}
                  className="currency-icon"
               />
            </p>
         ))}
      </header>
   );
};

export default Header;