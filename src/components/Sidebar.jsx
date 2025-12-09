"use client"
import Link from "next/link"
import AccountManager from "./AccountManager"

export default function Topbar() {

    return (
        <section className="relative p-4 flex flex-col h-full w-40 gap-4">
            <h1>Spotify<br/>taste mixer</h1>
            <AccountManager />
            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard">Home</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/library">Library</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/taste-mixer">Taste mixer</Link>
                    </li>
                </ul>
            </nav>
            <div className="bottom-0 absolute">
                <p>mp3</p>
                <p>Reproductor de current song</p>
            </div>

        </section>
    )
}