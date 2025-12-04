"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import ArtistWidget from "@/components/widgets/ArtistWidget"

export default function DashboardPage(){
    const [artists, setArtists] = useState([])
    const token = useRef(null)

    useEffect(() => {
        token.current = localStorage.getItem("spotify_token")
    }, [])

    return (
        <main>
            <h1>estoy en dashboard</h1>
            <ArtistWidget />
        </main>
    )
}
