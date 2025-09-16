import ItemInfo from "./ItemInfo";

const VendorInfo = ({ vendorName, vendorCategory, vendorData }) => {
   return (
      <div className="vendor-info">
         <header>
            <h2>{vendorName}</h2>
            <p>{vendorCategory}</p>
         </header>
         <div className="item-list">
            {vendorData.map((item) => (
               <ItemInfo key={item.id} item={item} />
            ))}
         </div>
      </div>
   );
};

export default VendorInfo;
