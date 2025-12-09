"use client";
import { useRouter } from "next/navigation"
import { useState, useRef } from "react";

export default function Searchbar() {
    const router = useRouter()
    const timeoutRef = useRef(null)
    const [isActive, setIsActive] = useState(false)

        
    function handleSearch(query) {
        clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            if (!query) return
            router.push(`/dashboard/search/${query}`)
        }, 300)
    }


    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                name="searchInput"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for artists, songs, or albums"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
}