// Sidebar pro

// import React from "react";
// import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// export default function Sidebar() {
//   return (
//     <div className="SidebarContainer">
//       <ProSidebar
//         style={{ backgroundColor: "red", height: "100vh"}}
//       >
//         <div className="text-center">
//           <button style={{background:"rgba(239, 155, 40, 1)",padding:"0 10px"}}>
//           <i className="fa-solid fa-arrow-right text-white"></i>
//           </button>
//         </div>
//         <Menu style={{ marginTop: "20px" }}>
//           <MenuItem
//             icon={<i className="fa-solid fa-house"></i>}
//             component={<Link to="/dashboard/home" />}
//           >
//             Home
//           </MenuItem>
//           <MenuItem
//             icon={<i className="fa-solid fa-user-group"></i>}
//             component={<Link to="/calendar/users" />}
//           >
//             Users
//           </MenuItem>
//           <MenuItem
//             icon={<i className="fa-regular fa-calendar-days"></i>}
//             component={<Link to="/dashboard/projects" />}
//           >
//             Projects
//           </MenuItem>
//           <MenuItem
//             icon={<i className="fa-solid fa-list-check"></i>}
//             component={<Link to="/dashboard/tasks" />}
//           >
//             Tasks
//           </MenuItem>
//         </Menu>
//       </ProSidebar>
//     </div>
//   );
// }

/* MUI Sidebar*/
// import * as React from "react";
// import { Link } from "react-router-dom";
// import Drawer from "@mui/material/Drawer";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import PeopleIcon from "@mui/icons-material/People";
// import WorkIcon from "@mui/icons-material/Work";
// import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";

// export default function Sidebar({noneOrBlock}) {
//   const drawerWidth = 240;

//   const menuItems = [
//     { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
//     { text: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
//     { text: "Projects", icon: <WorkIcon />, path: "/dashboard/projects" },
//     { text: "Tasks", icon: <TaskIcon />, path: "/dashboard/tasks" },
//   ];

//   return (
//     <Drawer
//       sx={{
//         display:{xs:noneOrBlock,sm:"block"},
//         width: `${drawerWidth}px`,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           backgroundColor: "rgba(14, 56, 47, 1)",
//           color: "rgba(255, 255, 255, 1)",
//           width: `${drawerWidth}px`,
//           boxSizing: "border-box",
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar />
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               component={Link}
//               to={item.path}
//               sx={{
//                 "&:hover": { color: "rgba(239, 155, 40, 1)" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "rgba(255, 255, 255, 1)" }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// }

// MUI React

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";
import { ExitToApp } from "@mui/icons-material";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";

export default function Sidebar({
  noneOrBlock,
  changeVariant,
  setNoneOrBlock,
}) {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const { LoginData } = React.useContext(AuthContext);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      sx={{
        display: { xs: noneOrBlock, md: "block" },
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: "rgba(14, 56, 47, 1)",
          color: "rgba(255, 255, 255, 1)",
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={changeVariant}
      anchor="left"
      open={changeVariant === "temporary" ? true : undefined}
      onClose={() => setNoneOrBlock("none")}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard"
            sx={{
              "&:hover, &:focus": {
                color: "rgba(239, 155, 40, 1)",
              },
              "&:hover .MuiListItemIcon-root, &:focus .MuiListItemIcon-root": {
                color: "rgba(239, 155, 40, 1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", transition: "color 0.3s" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {LoginData?.userGroup == "Manager" && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard/users"
              sx={{
                "&:hover, &:focus": {
                  color: "rgba(239, 155, 40, 1)",
                },
                "&:hover .MuiListItemIcon-root, &:focus .MuiListItemIcon-root":
                  {
                    color: "rgba(239, 155, 40, 1)",
                  },
              }}
            >
              <ListItemIcon sx={{ color: "white", transition: "color 0.3s" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard/projects"
            sx={{
              "&:hover, &:focus": {
                color: "rgba(239, 155, 40, 1)",
              },
              "&:hover .MuiListItemIcon-root, &:focus .MuiListItemIcon-root": {
                color: "rgba(239, 155, 40, 1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", transition: "color 0.3s" }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard/tasks"
              sx={{
                "&:hover, &:focus": {
                  color: "rgba(239, 155, 40, 1)",
                },
                "&:hover .MuiListItemIcon-root, &:focus .MuiListItemIcon-root":
                  {
                    color: "rgba(239, 155, 40, 1)",
                  },
              }}
            >
              <ListItemIcon sx={{ color: "white", transition: "color 0.3s" }}>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={Logout}
          sx={{
            "&:hover, &:focus": {
              color: "rgba(239, 155, 40, 1)",
            },
            "&:hover .MuiListItemIcon-root, &:focus .MuiListItemIcon-root": {
              color: "rgba(239, 155, 40, 1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", transition: "color 0.3s" }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}
