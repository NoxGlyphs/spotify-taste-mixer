"use client";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import { spotifySecureFetch } from "@/lib/spotify";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";
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
        <SpotifyPlaylist playlist={playlist} />
    );
}