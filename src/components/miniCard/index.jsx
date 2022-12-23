import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
const MiniCard = memo(() => {
  return (
    <div className="flex rounded-xl shadow-xl items-center space-x-4 w-64">
      <div className="left flex-shrink-0">
        <img src={logo} className="w-12 h-12"></img>
      </div>
      <div className="right overflow-hidden">
        <div className="text-lg">weChat</div>
        <p className="text-gray-500 flex-wrap">You have a new message about kkkkkkqqqqppppppppppp!</p>
      </div>
    </div>
  );
});

export default MiniCard;
