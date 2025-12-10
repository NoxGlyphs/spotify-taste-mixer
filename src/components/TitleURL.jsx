"use client";
import { usePathname } from "next/navigation";

export default function TitleURL() {
    const pathname = usePathname();
    let title = pathname.split("/")[2] || "Home"
    title = title.charAt(0).toUpperCase() + title.slice(1).replace("-", " ")

    return (
        <h3>{title}</h3>
    )
}