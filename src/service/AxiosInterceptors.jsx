import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import useLatestValue from "@/hooks/useLatestValue";
import local from "@/utils/local";
import qs from "qs";
import { judgArr } from "@/utils/pararms";
import {useLocation} from 'react-router-dom'
const silentCode = ["NOT_SET_TOTP_SECRET", "NOT_SET_PAY_PASSWORD"];
const AxiosInterceptors = (props) => {
  //const auth = useLatestValue(useAuthStore);
 const location=useLocation()
  const navigate = useLatestValue(useNavigate);
  useMemo(() => {
    if (props.request.interceptorInitialized) return; //解决热跟新的bug
    props.request.interceptorInitialized = true;
    props.request.interceptors.request.use(
      (config) => {
        console.log("ccccc"+location.pathname);
        // if (auth.current.token) {
        //   config.headers.Authorization = `Bearer ${auth.current.token}`;
        // }
        // if(location.pathname==="/planManage"){
        //   message.error("请登录！")
        //   navigate.current("/index")
        //   return;
        // }
        // message.error("请先登录"); 
        // navigate.current("/planManage");
        config.headers.token =  
          // local.get("token") || "d958911d-031f-4c80-b5ee-64467608ff9c";
          window.localStorage.getItem("ISC_SSO_TOKEN") ||
          "d1c289c2-28b8-44d9-abff-c10f97bcf865";
        if (config.method === "get" && config.params !== null) {
          if (judgArr(config.params)) {
            config.paramsSerializer = function (params) {
              return qs.stringify(params, { arrayFormat: "repeat" });
            };
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    props.request.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }, []);
  return null;
};

export default AxiosInterceptors;
