import bronzeCoin from '../assets/bronze.jpg';

const ItemInfo = ({ item }) => {
   return (
      <div className="item-card">
         <h3>{item.itemName}</h3>
         <div className="item-costs">
            {"cost" in item && typeof item.cost === "object" ? (
               Object.entries(item.cost).map(([currency, amount]) => (
                  <p key={currency}>
                     {currency}: {amount.toLocaleString()}{" "}
                     {currency === "bronzeCost" && (
                        <img src={bronzeCoin} alt="Bronze Coin" className="currency-icon" />
                     )}
                  </p>
               ))
            ) : (
               <p>
                  {item.bronzeCost.toLocaleString()}{" "}
                  <img src={bronzeCoin} alt="Bronze Coin" className="currency-icon" />
               </p>
            )}
         </div>
      </div>
   );
};

export default ItemInfo;