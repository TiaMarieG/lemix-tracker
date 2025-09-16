import { useState, useEffect } from "react";
import { AeonicusVendorData } from "../data/AeonicusVendorData";
import { AgosVendorData } from "../data/AgosVendorData";
import { ArturosVendorData } from "../data/ArturosVendorData";
import { DurusVendorData } from "../data/DurusVendorData";
import { FreddieVendorData } from "../data/FreddieVendorData";
import { HemetVendorData } from "../data/HemetVendorData";
import { HorosVendorData } from "../data/HorosVendorData";
import { JakkusVendorData } from "../data/JakkusVendorData";
import { LarahVendorData } from "../data/LarahVendorData";
import { PythagorusVendorData } from "../data/PythagorusVendorData";
import { SacerdormuVendorData } from "../data/SacerdormuVendorData";
import { UnicusVendorData } from "../data/UnicusVendorData";

const Header = () => {
   const [totalCosts, setTotalCosts] = useState({});

   useEffect(() => {
      const allVendorData = [
         ...AeonicusVendorData,
         ...AgosVendorData,
         ...ArturosVendorData,
         ...DurusVendorData,
         ...FreddieVendorData,
         ...HemetVendorData,
         ...HorosVendorData,
         ...JakkusVendorData,
         ...LarahVendorData,
         ...PythagorusVendorData,
         ...SacerdormuVendorData,
         ...UnicusVendorData,
      ];

      const newTotalCosts = allVendorData.reduce((totals, item) => {
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
               totals[currency] = (totals[currency] || 0) + amount;
            }
         }
         return totals;
      }, {});

      setTotalCosts(newTotalCosts);
   }, []);

   return (
      <header>
         <h1>Vendor Items Checklist</h1>
         <h2>Total Costs:</h2>
         {Object.entries(totalCosts).map(([currency, amount]) => (
            <p key={currency}>
               {currency}: {amount.toLocaleString()}
            </p>
         ))}
      </header>
   );
};

export default Header;
