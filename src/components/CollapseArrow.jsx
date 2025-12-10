"use client";
import { useState } from "react";

export default function CollapseArrow({collapseRef}) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function handleCollapse(collapseRef) {
        if (!collapseRef?.current) return ;
        
        if (isCollapsed) {
            collapseRef.current.style.maxHeight = collapseRef.current.scrollHeight + "px";
        } else {
            collapseRef.current.style.maxHeight = "0px";
        }
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div onClick={() => handleCollapse(collapseRef)}
        className={`backdrop-invert mask-[url(/arrow.svg)] cursor-pointer w-6 h-6 transition duration-100 ${isCollapsed ? "rotate-180" : ""}`}/>
    );
}