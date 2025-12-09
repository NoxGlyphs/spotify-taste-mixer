"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"
// import ItemList from "./ItemList"

export default function Library() {
    const [filter, setFilter] = useState(null) // 'playlists', 'artists' o 'albums'
    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    
    useEffect(() => {
        async function fetchLibrary() {
            const fetchedPlaylists = await spotifySecureFetch('/me/playlists', { params: { limit: 20 } })
            console.log("Fetched playlists:", fetchedPlaylists)
            const fetchedArtists = await spotifySecureFetch('/me/following', { params: { type: 'artist' } })
            console.log("Fetched artists:", fetchedArtists)
            setPlaylists(fetchedPlaylists.items)
        }

        fetchLibrary()
    }, [])

    return (
        <div>
            <h1>Library Component</h1>
            {/* <ItemList 
                items={showArtists ? artists : playlists} 
                emptyMsg={showArtists ? "No artists followed yet" : "No playlists created yet"} 
            /> */}
        </div>
    )
}