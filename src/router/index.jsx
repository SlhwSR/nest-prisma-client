import { createHashRouter } from "react-router-dom";
import {lazy} from 'react'
import App from "../App";
import Main from "../pages/main";
//import PlanManage from "../pages/planManage";
// import AxiosInterceptors from "../service/AxiosInterceptors";
import { request,AxiosInterceptors } from "../service/index";
const Login=lazy(()=>import("@/pages/login"))
const PlanManage=lazy(()=>import("@/pages/planManage"))
const GroupManage=lazy(()=>import("@/pages/groupManage"))
const CardManage=lazy(()=>import("@/pages/planManage"))
export const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <AxiosInterceptors request={request}></AxiosInterceptors>
      </>
    ),
    children: [ 
      {
        path: "/",
        element: <Main></Main>,
        children: [
          {   
            path: "/index",
            element: <GroupManage></GroupManage>,
            //index: true,
          },
          {
            path: "/planManage",
            element: <PlanManage></PlanManage>,
          },
          {
            path:"/producitonDate",
            element:<CardManage/>
          }
        ],
      },
      // {
      //   ptah: "*",
      //   element: <h1>404 NotFound</h1>,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    ptah: "*",
    element: <h1>404 NotFound</h1>,
  },
]);