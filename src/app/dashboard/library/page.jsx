"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"
import ItemList from "@/components/ItemList"


export default function Library() {
    const [filter, setFilter] = useState(null) // 'playlists', 'artists' o 'albums'
    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    
    useEffect(() => {
        async function fetchLibrary() {
            const fetchedPlaylists = await spotifySecureFetch('/me/playlists', { params: { limit: 20 } })
            console.log("Fetched playlists:", fetchedPlaylists)
            setPlaylists(fetchedPlaylists.items)

            const fetchedArtists = await spotifySecureFetch('/me/following', { params: { type: 'artist' } })
            console.log("Fetched artists:", fetchedArtists)
            setArtists(fetchedArtists.artists.items)
        }

        fetchLibrary()
    }, [])

    return (
        <div>
            <h1>Library Component</h1>
            <ItemList 
                title="Playlists"
                items={playlists} 
                emptyMsg={"No playlists created yet"} 
            />
            <ItemList 
                title="Artists"
                items={artists} 
                emptyMsg={"No artists followed yet"} 
            />
        </div>
    )
}