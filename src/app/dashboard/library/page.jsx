"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"
import PlaylistList from "@/components/lists/PlaylistList"


export default function Library() {
    const [filter, setFilter] = useState(true) // true for owned, false for followed
    const [ownedPlaylists, setOwnedPlaylists] = useState([])
    const [followedPlaylists, setFollowedPlaylists] = useState([])
    
    useEffect(() => {
        async function fetchLibrary() {
            const currentUser = await spotifySecureFetch('/me')
            const fetchedPlaylists = await spotifySecureFetch('/me/playlists', { params: { limit: 20 } })
            
            const owned = []
            const followed = []

            fetchedPlaylists?.items?.forEach(playlist => {
                if (playlist.owner.id === currentUser.id) {
                    owned.push(playlist)
                } else {
                    followed.push(playlist)
                }
            })

            setOwnedPlaylists(owned)
            setFollowedPlaylists(followed)
        }

        fetchLibrary()
    }, [])

    return (
        <div>
            <div className="flex gap-4">
                <button onClick={()=>setFilter(true)}>My playlists</button>
                <button onClick={()=>setFilter(false)}>Followed</button>
            </div>
            <PlaylistList items={filter ? ownedPlaylists : followedPlaylists} />
        </div>
    )
}