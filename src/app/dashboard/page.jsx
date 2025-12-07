"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import ArtistWidget from "@/components/widgets/ArtistWidget"
import AccountManager from "@/components/AccountManager"
import Searchbar from "@/components/Searchbar"

export default function DashboardPage(){
    const [artists, setArtists] = useState([])
    const token = useRef(null)

    useEffect(() => {
        token.current = localStorage.getItem("spotify_token")
    }, [])

    function handleSearch(query){
        console.log("Searching for:", query)
    }

    return (
        <main>
            <h1>estoy en dashboard</h1>
            <ArtistWidget />
            <AccountManager />
            <Searchbar onSearch={ handleSearch } />
        </main>
    )
}
