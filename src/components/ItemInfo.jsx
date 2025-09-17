import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import bronzeCoin from "../assets/bronze.png";

const ItemInfo = ({ item }) => {
   return (
      <Box 
         className="item-card" 
         sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center" 
         }}
      >
         <h5>{item.itemName}</h5>
         <Box className="item-costs" sx={{ display: "flex", alignItems: "center" }}>
            {"cost" in item && typeof item.cost === "object" ? (
               Object.entries(item.cost).map(([currency, amount]) => (
                  <Box key={currency} sx={{ display: "flex", alignItems: "center" }}>
                     {currency === "bronzeCost" ? (
                        <>
                           <span>{amount.toLocaleString()}</span>
                           <img src={bronzeCoin} alt="Bronze Coin" className="currency-icon" />
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
                  <span>{item.bronzeCost.toLocaleString()}</span>
                  <img src={bronzeCoin} alt="Bronze Coin" className="currency-icon" />
               </Box>
            )}
            <Checkbox sx={{ ml: "auto", pr: 0 }} />
         </Box>
      </Box>
   );
};

export default ItemInfo;