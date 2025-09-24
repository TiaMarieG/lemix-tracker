import TotalCostTracker from "./components/TotalCostTracker";
import VendorInfo from "./components/VendorInfo";
import Header from "./components/Header";
import { useCollection } from "../src/hooks/useCollection";
import Box from "@mui/material/Box";
import { Analytics } from '@vercel/analytics/react';

const App = () => {
   const { vendors } = useCollection();

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
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
                     display: "flex",
                     flexWrap: "wrap",
                     justifyContent: "space-between",
                  }}
               >
                  {vendors.map((vendor) => (
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
