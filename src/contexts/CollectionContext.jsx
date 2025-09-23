import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { vendors } from '../data/Vendors';

export const CollectionContext = createContext();

export default function CollectionProvider({ children }) {
   const [collectedItems, setCollectedItems] = useState(() => {
      try {
         const saved = localStorage.getItem('collectedItems');
         return saved ? JSON.parse(saved) : {};
      } catch (error) {
         console.error("Failed to parse collected items from localStorage", error);
         return {};
      }
   });

   useEffect(() => {
      localStorage.setItem('collectedItems', JSON.stringify(collectedItems));
   }, [collectedItems]);

   const handleItemToggle = useCallback((vendorName, itemId) => {
      const uniqueKey = `${vendorName}-${itemId}`;
      setCollectedItems(prev => ({ ...prev, [uniqueKey]: !prev[uniqueKey] }));
   }, []);

   const allVendorData = useMemo(() => {
      return vendors.flatMap(vendor =>
         vendor.data
            .filter(item => item != null)
            .map(item => ({ ...item, vendorName: vendor.name }))
      );
   }, []);
   
   const value = { collectedItems, handleItemToggle, allVendorData, vendors };

   return (
      <CollectionContext.Provider value={value}>
         {children}
      </CollectionContext.Provider>
   );
};