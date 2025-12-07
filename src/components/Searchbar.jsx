"use client";

import { useState, useEffect } from "react";

export default function Searchbar({ onSearch }) {
    const [query, setQuery] = useState("")
    const [isActive, setIsActive] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();

        onSearch(query);
    }



    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="searchInput"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for artists, songs, or albums"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
}