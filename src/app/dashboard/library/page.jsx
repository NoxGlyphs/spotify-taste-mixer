"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"
import PlaylistList from "@/components/lists/PlaylistList"

const activeStyle= "shadow-sm/30 outline-1 outline-[rgb(var(--color-border))] bg-[rgba(var(--color-bg),0.8)] text-[rgba(var(--color-fg),1)]"

export default function Library() {
    const [filter, setFilter] = useState(true) // true for owned, false for followed
    const [ownedPlaylists, setOwnedPlaylists] = useState([])
    const [followedPlaylists, setFollowedPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchLibrary() {
            try {
                setLoading(true)
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
            } catch (error) {
                console.error("Error fetching playlists:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLibrary()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "rgb(var(--secondary-color))" }}></div>
            </div>
        )
    }

    return (
        <div>
            <div className="mt-2 mb-6 flex w-fit rounded-4xl p-1 px-1 gap-2 border border-[rgb(var(--color-border))] bg-[rgba(var(--color-border),0.15)] inset-shadow-sm/30">
                <button onClick={()=>setFilter(true)} className={`px-2 p-1 text-[rgba(var(--color-fg),0.7)] transition duration-300 rounded-4xl ${filter ? activeStyle : ""}`}>My playlists</button>
                <button onClick={()=>setFilter(false)} className={`px-2 p-1 text-[rgba(var(--color-fg),0.7)] transition duration-300 rounded-4xl ${filter ? "" : activeStyle}`}>Followed</button>
            </div>
            <PlaylistList items={filter ? ownedPlaylists : followedPlaylists} />
        </div>
    )
}
