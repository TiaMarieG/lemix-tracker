import React, { useState, useEffect } from 'react';
import { AeonicusVendorData } from '../data/AeonicusVendorData';
import { AgosVendorData } from '../data/AgosVendorData';
import { ArturosVendorData } from '../data/ArturosVendorData';
import { DurusVendorData } from '../data/DurusVendorData';
import { HemetVendorData } from '../data/HemetVendorData';
import { HorosVendorData } from '../data/HorosVendorData';
import { JakkusVendorData } from '../data/JakkusVendorData';
import { LarahVendorData } from '../data/LarahVendorData';
import { PythagorusVendorData } from '../data/PythagorusVendorData';
import { SacerdormuVendorData } from '../data/SacerdormuVendorData';
import { UnicusVendorData } from '../data/UnicusVendorData';

const Header = () => {
   const [totalCost, setTotalCost] = useState(0);

   useEffect(() => {
      const allVendorData = [
         ...AeonicusVendorData,
         ...AgosVendorData,
         ...ArturosVendorData,
         ...DurusVendorData,
         ...HemetVendorData,
         ...HorosVendorData,
         ...JakkusVendorData,
         ...LarahVendorData,
         ...PythagorusVendorData,
         ...SacerdormuVendorData,
         ...UnicusVendorData
      ];

      const totalCostCalculated = allVendorData.reduce((sum, item) => {
         if ('cost' in item) {
            return sum + (item.cost.bronze || 0);
         }
         else if ('bronzeCost' in item) {
            return sum + (item.bronzeCost || 0);
         }
         return sum;
      }, 0);

      setTotalCost(totalCostCalculated);
   }, []);

   return (
      <header>
         <h1>Total Cost: {totalCost}</h1>
      </header>
   );
}

export default Header;