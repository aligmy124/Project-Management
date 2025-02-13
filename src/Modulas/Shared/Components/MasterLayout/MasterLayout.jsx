// import React, { useState } from 'react'
// import Navbar from '../Navbar/Navbar'
// import Sidebar from '../Sidebar/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { Box } from '@mui/material';

// export default function MasterLayout() {
//   const drawerWidth = 240;
//   const[noneOrBlock,setNoneOrblock]=useState("none");
//   // const[changeVariant,setChangeVariant]=useState("permanent");
//   return (
//     <>
//     <Box  sx={{position:"fixed",top:"0",left:"0",width:"100%"}}> 
//     <Navbar setNoneOrBlock={setNoneOrblock} />
//     </Box>
//       <Box >
//       <Sidebar noneOrBlock={noneOrBlock} />
//       </Box>
//       <Box sx={{ml:{sm:"340px", marginTop:"85px"}}} >
//       <Outlet/>
//       </Box>
//     </>
//   )
// }

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function MasterLayout() {
  const drawerWidth = 240;
  const [noneOrBlock, setNoneOrBlock] = useState("none");
  const [changeVariant, setChangeVariant] = useState("permanent");

  return (
    <>
      {/* شريط التنقل العلوي */}
      <Box sx={{ position: "fixed", top: "0", left: "0", width: "100%"}}>
        <Navbar setNoneOrBlock={setNoneOrBlock} setChangeVariant={setChangeVariant} />
      </Box>

      {/* القائمة الجانبية */}
      <Box>
        <Sidebar noneOrBlock={noneOrBlock} changeVariant={changeVariant} setNoneOrBlock={setNoneOrBlock} />
      </Box>

      {/* محتوى الصفحة */}
      <Box sx={{ ml: { md:"290px" }, mr:{md:"20px"}, marginTop: "85px" }}>
        <Outlet />
      </Box>
    </>
  );
}
