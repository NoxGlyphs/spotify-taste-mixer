"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify";
import TrackList from "./lists/TrackList";

export default function SpotifyPlaylist({playlist}) {
    const [photoURL, setPhotoURL] = useState("/default-user.png");

    useEffect(() => { 
        async function fetchUserPhoto() {
            const user = await spotifySecureFetch(`/users/${playlist?.owner?.id}`)
            const photo = user.images?.[0]?.url;
            if (photo) setPhotoURL(photo);
        }
        fetchUserPhoto();
    }, [playlist?.owner?.id]);

    return (
        <div>
            <div className="flex">
                <img alt="Playlist Image" width={200} height={200} 
                    src={playlist?.images?.[0]?.url || "/default-playlist.png"}
                />
                <div>
                    <h1 className="font-bold text-4xl">{playlist?.name}</h1>
                    <div className="flex">
                        <img src={photoURL} alt="Owner photo" className="rounded-full w-8 h-8"/>
                        <h3 className="text-xl px-3">{playlist?.owner?.display_name}</h3>
                    </div>
                </div>
            </div>
            <TrackList tracks={playlist?.tracks?.items?.map(item => item.track)} />
        </div>
    )
}