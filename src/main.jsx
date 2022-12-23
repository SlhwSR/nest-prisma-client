import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "@/store";
import './assets/css/base.css'
dayjs.locale("zh-cn");
ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#2644A3",
        // borderRadius:"0"
      },
      components:{ 
        Menu:{
          colorInfoBg:"#fff"
        }
      }
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </ConfigProvider>
);
