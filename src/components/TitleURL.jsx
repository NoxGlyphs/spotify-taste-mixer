"use client";
import { usePathname } from "next/navigation";

export default function TitleURL() {
    const pathname = usePathname();
    let title = pathname.split("/").pop()
    if (title === "dashboard") title = "Home"

    return (
        <h3>{title.toUpperCase()}</h3>
    )
}