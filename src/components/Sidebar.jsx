"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AccountManager from "./AccountManager"
import animations from "../styles/animations.module.css"

const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/library", label: "Library" },
    { href: "/dashboard/taste-mixer", label: "Taste mixer" },
]

export default function Topbar() {
    const pathname = usePathname();

    return (
        <section className="p-6 relative  h-full  overflow-hidden border-r-2 border-[rgb(var(--color-border))]">
            <div className= {`absolute w-screen h-screen ${animations.spin} bg-[url('/bg-image.jpg')] bg-repeat bg-center  inset-0 z-2 blur-2xl left-1/2 -translate-x-1/2`}/>
            <div className={`absolute inset-0 bg-(--backdrop-color)  z-3`}/>
            
            <div className="flex flex-col gap-4 z-10 relative h-full">
                <h1 className="relative rigth-0 text-4xl font-bold text-center w-max" >Spotify<br/>taste mixer</h1>
                <div className="border-t border-[rgba(var(--color-fg),0.3)] "/>
                <AccountManager />
                <div className="border-t border-[rgba(var(--color-fg),0.3)] mb-3"/>
                <nav>
                    <ul>
                        {links.map((link) => (
                            <li key={link.href} 
                                className={`text-[rgba(var(--color-fg),0.6)] relative overflow-hidden font-semibold mb-2  rounded-lg outline-[rgb(var(--color-border))] hover:outline-1 ${pathname === link.href ? "shadow-lg/15 bg-gradient-to-r from-[rgba(var(--secondary-color),0.5)] via-[rgb(var(--color-bg))] to-[rgb(var(--color-bg))] outline-1 text-[rgba(var(--color-fg),1)] before:content before:absolute before:rounded-lg before:left-[-98%] before:w-full before:h-[80%] before:top-[10%] before:bg-[rgb(var(--secondary-color))] before:z-20" : ''}`}>
                                <Link href={link.href} className="w-full flex px-3 py-2">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="bottom-4 absolute">
                    <p>mp3</p>
                    <p>Reproductor de current song</p>
                </div>
            </div>
        </section>
    )
}