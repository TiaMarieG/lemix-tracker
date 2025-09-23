// src/components/ItemInfo.jsx
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import bronzeCoin from "../assets/bronze.png";
import horn from "../assets/horn.png";
import gem from "../assets/gem.png";
import ore from "../assets/ore.png";
import fire from "../assets/fire.png";

const currencyIcons = {
   bronzeCost: bronzeCoin,
   horn: horn,
   gem: gem,
   ore: ore,
   fire: fire,
};

const ItemInfo = ({ item, collectedItems, onItemToggle }) => {
   const uniqueKey = `${item.vendorName}-${item.id}`;
   const isCollected = collectedItems[uniqueKey] || false;

   const handleCheckboxChange = () => {
      onItemToggle(item.vendorName, item.id);
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
         <Box
            className="item-costs"
            sx={{ display: "flex", alignItems: "center" }}
         >
            {"cost" in item && typeof item.cost === "object" ? (
               Object.entries(item.cost).map(([currency, amount]) => (
                  <Box
                     key={currency}
                     sx={{ display: "flex", alignItems: "center", mr: 1 }}
                  >
                     {currencyIcons[currency] ? (
                        <>
                           <span style={{ marginRight: "5px" }}>
                              {amount.toLocaleString()}
                           </span>
                           <img
                              src={currencyIcons[currency]}
                              alt={`${currency} icon`}
                              className="currency-icon"
                           />
                        </>
                     ) : (
                        <p>
                           {currency}: {amount.toLocaleString()}
                        </p>
                     )}
                  </Box>
               ))
            ) : (
               <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "5px" }}>
                     {item.bronzeCost.toLocaleString()}
                  </span>
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

export default ItemInfo;