"use client";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import { spotifySecureFetch } from "@/lib/spotify";
import Image from "next/image";

export default function PlaylistPage() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        async function fetchPlaylist() {
            const data = await spotifySecureFetch(`/playlists/${id}`);
            setPlaylist(data);
        }
        fetchPlaylist();
    }, [id]);

    return (
        <div>
            <div className="flex">
                <img alt="Playlist Image" width={200} height={200} 
                    src={playlist?.images?.[0]?.url || "/default-playlist.png"}
                />
                <h1 className="font-bold text-4xl">{playlist.name}</h1>
            </div>
        </div>
    );
}