"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify"

export default function SearchPage() {
    const query = usePathname().split("/").pop()
    useEffect(() => {
        async function fetchSearchResults() {
            const res = await spotifySecureFetch('/search', {
                params: {
                    q: query,
                    type: 'artist,album,track',
                    limit: 20
                }
            })
            console.log("Search results:", res)
        }
        fetchSearchResults()
    }, [query])

    return (
        <div>
            <h1>Search Results for: {query}</h1> 
        </div>
    )
}