import { useContext } from "react";
import { AuthContext } from "./AuthJWT";
import ProjectsEmployee from "../../../Modulas/Dashboard/Components/Projects/ProjectsEmployee";
import ProjectsAdmin from "../../../Modulas/Dashboard/Components/Projects/Projects";

export default function ProjectsWrapper() {
  const { LoginData } = useContext(AuthContext);

  if (!LoginData) return <div>Loading...</div>; // loader أو null

  return LoginData.userGroup === "Manager" ? <ProjectsAdmin/> : <ProjectsEmployee/>;
}
