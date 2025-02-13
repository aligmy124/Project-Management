// import React, { useContext } from "react";
// import img_nav from "../../../../assets/images/nav-logo.png"
// import logo_man from "../../../../assets/images/Ellipse 18.png"
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";
// export default function Navbar() {
//   // context
//   const {LoginData}=useContext(AuthContext)
//   return (

// <nav className="navbar navbar-expand-lg navbar-light bg-light">
// <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//   <div className="collapse navbar-collapse" id="bar">
//     <div className="d-flex justify-content-between w-100">
//       <div className="img">
//         <Link to="/home">
//         <img src={img_nav} alt="nav-logo" />
//         </Link>
//       </div>
//         <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//         <div className="d-flex justify-content-between align-items-center h-100"style={{marginRight:"10px"}}>
//           <div className="img-circle"style={{marginRight:"10px"}}>
//             <img src={logo_man } alt="logo_man " />
//           </div>
//           <div className="text">
//             <h4 style={{fontSize:"14px",fontWeight:"400",lineHeight:"17px"}}>{LoginData?.userName}</h4>
//             <p style={{fontSize:"12px",fontWeight:"400",lineHeight:"14px"}}>{LoginData?.userEmail}</p>
//           </div>
//         </div>
//       </li>
//     </ul>
//     </div>

//   </div>
// </nav>

//   );
// }

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import img_nav from "../../../../assets/images/nav-logo.png";
// import logo_man from "../../../../assets/images/Ellipse 18.png";
// import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";

// function ResponsiveAppBar({setNoneOrBlock}) {
//   const drawerWidth = 240;
//   const {LoginData}=React.useContext(AuthContext)
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar sx={{ width:{sm:`calc(100% - ${drawerWidth}px)`}, ml:{sm:`${drawerWidth}px`},backgroundColor:"#fff"}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <IconButton sx={{display:{sm:"none"}}} onClick={()=>{
//             setNoneOrBlock("block")
//           }}>
//             <MenuIcon/>            
//           </IconButton>
//           <Box sx={{ display: { md: "flex" }, mr: 1, flexGrow: 1 }}>
//             <img src={img_nav} alt="nav-logo" />
//           </Box>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               <img src={img_nav} alt="nav-logo" />
//             </Menu>
//           </Box>
//           <Box display="flex" alignItems="center" sx={{ marginRight: "10px" }}>
//             {/* صورة المستخدم */}
//             <Avatar
//               src={logo_man}
//               alt="User Logo"
//               sx={{ marginRight: "10px" }}
//             />

//             {/* معلومات المستخدم */}
//             <Box>
//               <Typography
//                 variant="h6"
//                 sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "17px",color:"#000"}}
//               >
//                 {LoginData?.userName}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "14px",color:"#000" }}
//               >
//                 {LoginData?.userEmail}
//               </Typography>
//             </Box>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import img_nav from "../../../../assets/images/nav-logo.png";
import logo_man from "../../../../assets/images/Ellipse 18.png";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";

function ResponsiveAppBar({ setNoneOrBlock, setChangeVariant }) {
  const drawerWidth = 240;
  const { LoginData } = React.useContext(AuthContext);

  return (
    <AppBar
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* زر القائمة الجانبية للأجهزة الصغيرة */}
          <IconButton
            sx={{ display: { md: "none" } }}
            onClick={() => {
              setNoneOrBlock("block"); // يجعل القائمة الجانبية مرئية
              setChangeVariant("temporary"); // يجعل القائمة الجانبية متحركة
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* شعار الموقع */}
          <Box sx={{ display: { md: "flex" }, mr: 1, flexGrow: 1 }}>
            <img src={img_nav} alt="nav-logo" />
          </Box>

          {/* معلومات المستخدم */}
          <Box display="flex" alignItems="center" sx={{ marginRight: "10px" }}>
            <Avatar src={logo_man} alt="User Logo" sx={{ marginRight: "10px" }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "17px", color: "#000" }}
              >
                {LoginData?.userName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "14px", color: "#000" }}
              >
                {LoginData?.userEmail}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
