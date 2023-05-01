import React from "react";
import { type AdminInfo } from "../types/types";

function AdminInfoComponent(props: AdminInfo) {

    return (
        <div className="bg-buttonDark h-24 sm:h-32 min-w-[8rem] sm:min-w-[14rem] text-white whitespace-nowrap px-5 py-2 sm:gap-2 flex flex-col">
            <h1 className="text-lg sm:text-2xl">{props.title}</h1>
            <p className="text-3xl sm:text-5xl">{props.count}</p>
        </div>
    )
}

export default AdminInfoComponent;
