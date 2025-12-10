"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"
import PlaylistList from "@/components/lists/PlaylistList"

const activeStyle= "shadow-sm/30 outline-1 outline-[rgb(var(--color-border))] bg-[rgba(var(--color-bg),0.8)] text-[rgba(var(--color-fg),1)]"

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
            <div className=" mt-2 mb-6 flex w-fit rounded-4xl p-1 px-1 gap-2 border border-[rgb(var(--color-border))] bg-[rgba(var(--color-border),0.15)]  inset-shadow-sm/30">
                <button onClick={()=>setFilter(true)} className={` px-2  p-1 text-[rgba(var(--color-fg),0.7)] transition duration-300 rounded-4xl ${filter ? activeStyle : ""}`}>My playlists</button>
                <button onClick={()=>setFilter(false)} className={`px-2  p-1 text-[rgba(var(--color-fg),0.7)] transition duration-300 rounded-4xl ${filter ? "" : activeStyle} `}>Followed</button>
            </div>
            <PlaylistList items={filter ? ownedPlaylists : followedPlaylists} />
        </div>
    )
}