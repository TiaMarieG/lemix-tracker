// src/App.jsx

import { useState, useMemo } from "react";
import TotalCostTracker from "./components/TotalCostTracker";
import VendorInfo from "./components/VendorInfo";
import Header from "./components/Header";
import ToggleOptions from "./components/ToggleOptions";
import { useCollection } from "../src/hooks/useCollection";
import Box from "@mui/material/Box";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
   const { vendors } = useCollection();
   const [isToggled, setIsToggled] = useState(false);
   const [hideCollected, setHideCollected] = useState(false);

   const sortedVendors = useMemo(() => {
      const sortableVendors = [...vendors];
      if (isToggled) {
         sortableVendors.sort((a, b) => a.name.localeCompare(b.name));
      }
      return sortableVendors;
   }, [vendors, isToggled]);

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
         }}
      >
         <Header />
         <Analytics />
         <Box
            sx={{
               flexGrow: 1,
               display: "flex",
               justifyContent: "center",
            }}
         >
            <Box sx={{ maxWidth: 1000, width: "100%", p: 2 }}>
               <TotalCostTracker />

               <Box
                  sx={{
                     width: { xs: "100%", md: "49%" },
                     mb: 2,
                     mx: "auto"
                  }}
               >
                  <ToggleOptions
                     isToggled={isToggled}
                     onToggle={() => setIsToggled((prev) => !prev)}
                     hideCollected={hideCollected}
                     onHideToggle={() => setHideCollected((prev) => !prev)}
                  />
               </Box>

               <Box
                  sx={{
                     display: "flex",
                     flexWrap: "wrap",
                     justifyContent: "space-between",
                  }}
               >
                  {sortedVendors.map((vendor) => (
                     <Box
                        key={vendor.name}
                        sx={{
                           width: { xs: "100%", md: "49%" },
                           mb: 2,
                        }}
                     >
                        <VendorInfo
                           vendorName={vendor.name}
                           vendorCategory={vendor.category}
                           vendorData={vendor.data.filter(
                              (item) => item != null
                           )}
                           hideCollected={hideCollected}
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
