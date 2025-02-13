import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from './Modulas/Shared/Components/AuthLayout/AuthLayout';
import ErrorPage from './Modulas/Shared/Components/ErrorPage/ErrorPage';
import Login from './Modulas/Auth/Component/Login/Login';
import Register from './Modulas/Auth/Component/Register/Register';
import MasterLayout from './Modulas/Shared/Components/MasterLayout/MasterLayout';
import Home from './Modulas/Dashboard/Components/Home/Home';
import Projects from './Modulas/Dashboard/Components/Projects/Projects';
import Tasks from './Modulas/Dashboard/Components/Tasks/Tasks';
import Users from './Modulas/Dashboard/Components/Users/Users';
import Mainpage from './Modulas/Mainpage/Mainpage';
import Forget from './Modulas/Auth/Component/Forget/Forget';
import Reset from './Modulas/Auth/Component/Reset/Reset';
import Verify from './Modulas/Auth/Component/Verify/Verify';
import Change from './Modulas/Auth/Component/Change/Change';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateProject from './Modulas/Dashboard/Components/Projects/CreateProject';
import CreateUsers from './Modulas/Dashboard/Components/Users/CreateUser';
import CreateTasks from './Modulas/Dashboard/Components/Tasks/CreateTask';
import TaskBoard from './Modulas/Dashboard/Components/Tasks/TaskBoard';


function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Mainpage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget", element: <Forget /> },
        { path: "reset", element: <Reset /> },
        { path: "verify", element: <Verify /> },
        { path: "change", element: <Change /> },
      ]
    },
    {
      path: '/dashboard',
      element: <MasterLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "projects", element: <Projects /> },
        { path: "create_project", element: <CreateProject /> },
        { path: "tasks", element: <Tasks /> },
        { path: "create_task", element: <CreateTasks /> },
        { path: "task_board", element: <TaskBoard /> },
        { path: "users", element: <Users /> },
        { path: "create_users", element: <CreateUsers /> },
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;


