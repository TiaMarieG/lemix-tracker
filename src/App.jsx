// src/App.jsx
import { useState, useEffect } from 'react';
import TotalCostTracker from './components/TotalCostTracker';
import VendorInfo from './components/VendorInfo';
import Header from './components/Header';
import { vendors } from './data/Vendors';
import Box from '@mui/material/Box';

const App = () => {
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
    try {
      localStorage.setItem('collectedItems', JSON.stringify(collectedItems));
    } catch (error) {
      console.error("Failed to save collected items to localStorage", error);
    }
  }, [collectedItems]);

  const handleItemToggle = (vendorName, itemId) => {
    const uniqueKey = `${vendorName}-${itemId}`;
    setCollectedItems(prevCollectedItems => ({
      ...prevCollectedItems,
      [uniqueKey]: !prevCollectedItems[uniqueKey]
    }));
  };

  const allVendorData = vendors.flatMap(vendor => 
    vendor.data
      .filter(item => item != null)
      .map(item => ({ ...item, vendorName: vendor.name }))
  );

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 1000,
            width: '100%',
            p: 2,
          }}
        >
          <TotalCostTracker 
            allVendorData={allVendorData} 
            collectedItems={collectedItems} 
          />
          
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            {vendors.map(vendor => (
              <Box key={vendor.name} sx={{ width: '49%', mb: 2 }}>
                <VendorInfo
                  vendorName={vendor.name}
                  vendorCategory={vendor.category}
                  vendorData={vendor.data.filter(item => item != null)}
                  collectedItems={collectedItems}
                  onItemToggle={handleItemToggle}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;