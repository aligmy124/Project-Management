import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from './Modulas/Shared/Components/AuthLayout/AuthLayout';
import ErrorPage from './Modulas/Shared/Components/ErrorPage/ErrorPage';
import Login from './Modulas/Auth/Component/Login/Login';
import Register from './Modulas/Auth/Component/Register/Register';
import MasterLayout from './Modulas/Shared/Components/MasterLayout/MasterLayout';
import Home from './Modulas/Dashboard/Components/Home/Home';
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
import { useContext } from 'react';
import { AuthContext } from './Context/Components/AuthJWT/AuthJWT';
import ProjectsWrapper from './Context/Components/AuthJWT/Wrapper';
import WrapperTask from './Context/Components/AuthJWT/WrapperTask';


function App() {
  const loginData=useContext(AuthContext);
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
        { path: "projects", element:<ProjectsWrapper/> },
        { path: "create_project", element: <CreateProject /> },
        { path: "tasks", element: <WrapperTask/> },
        { path: "create_task", element: <CreateTasks /> },
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


