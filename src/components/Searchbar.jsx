"use client";
import { useRouter } from "next/navigation"
import { useState, useRef } from "react";

export default function Searchbar({className="flex items-center"}) {
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
        <form onSubmit={(e) => e.preventDefault()} className={className}>
            <input
                type="text"
                name="searchInput"
                className="ml-12 md:ml-0 px-2 flex w-fit rounded-4xl p-1 px-1 gap-2 border-1 border-[rgb(var(--color-border))] bg-[rgba(var(--color-border),0.15)]  inset-shadow-sm/30"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for songs"
                required
            />
            <button type="submit"
                className=" ml-2 h-full aspect-square flex justify-center cursor-pointer"
            >
                <img src="/search-icon.svg" alt="Search" width={20} height={20} />
            </button>
        </form>
    );
}