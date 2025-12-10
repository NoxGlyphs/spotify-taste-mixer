"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import AccountManager from "./AccountManager"
import animations from "../styles/animations.module.css"

const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/library", label: "Library" },
    { href: "/dashboard/taste-mixer", label: "Taste mixer" },
]

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false); 
    return (
        <>
            <button 
                className="md:hidden fixed left-4 z-50 p-2 font-extrabold text-2xl"
                onClick={() => setOpen(!open)}
            >
                {open ? "✕" : "☰"}
            </button>

            <section 
                className={`
                    md:min-w-max fixed top-0 left-0 h-full w-64 p-6 overflow-hidden border-r-2 border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))] z-40 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:top-0 md:left-0 md:z-auto
                `}
            >
                <div className= {`absolute w-[1200px] h-[1200px] ${animations.spin} bg-[url('/bg-image.jpg')] bg-repeat bg-center inset-0 blur-2xl left-1/2 -translate-x-1/2`}/>
                <div className={`z-10 absolute inset-0 bg-[var(--backdrop-color)]`}/>
                
                <div className="flex flex-col gap-4 z-10 relative h-full">
                    <h1 className="text-4xl font-extrabold text-center w-max">Spotify<br/>taste mixer</h1>
                    <div className="border-t border-[rgba(var(--color-fg),0.3)]"/>
                    <AccountManager />
                    <div className="border-t border-[rgba(var(--color-fg),0.3)] mb-3"/>
                    <nav>
                        <ul>
                            {links.map((link) => (
                                <li key={link.href} 
                                    className={`text-[rgba(var(--color-fg),0.6)] relative overflow-hidden font-semibold mb-2 rounded-lg hover:outline-1 ${pathname === link.href ? " outline-1 shadow-lg/15 bg-gradient-to-r from-[rgba(var(--secondary-color),0.5)] via-[rgb(var(--color-bg))] to-[rgb(var(--color-bg))] text-[rgba(var(--color-fg),1)] before:content before:absolute before:rounded-lg before:left-[-98%] before:w-full before:h-[80%] before:top-[10%] before:bg-[rgb(var(--secondary-color))] before:z-20" : ''}`}>
                                    <Link href={link.href} className="w-full flex px-3 py-2">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>

            {open && <div 
                className="fixed inset-0 bg-black/30 z-30 md:hidden"
                onClick={() => setOpen(false)}
            />}
        </>
    )
}
