import React from 'react';
import Header from './components/Header';
import VendorInfo from './components/VendorInfo';
import { vendors } from './data/Vendors';

const App = () => {
  return (
    <div>
      <Header />
      
      {vendors.map(vendor => (
        <React.Fragment key={vendor.name}>
          <VendorInfo
            vendorName={vendor.name}
            vendorCategory={vendor.category}
            vendorData={vendor.data.filter(item => item != null)}
          />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;