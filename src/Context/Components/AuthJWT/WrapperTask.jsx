import { useContext } from "react";
import { AuthContext } from "./AuthJWT";
import Tasks from "../../../Modulas/Dashboard/Components/Tasks/TaskBoard";
import TaskBoard from "../../../Modulas/Dashboard/Components/Tasks/TaskBoard";

export default function WrapperTask() {
  const { LoginData } = useContext(AuthContext);

  if (!LoginData) return <div>Loading...</div>; // loader أو null

  return LoginData.userGroup === "Manager" ? <Tasks/> : <TaskBoard/>;
}
