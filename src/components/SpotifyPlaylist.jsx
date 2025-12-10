"use client"
import { useState, useEffect } from "react"
import { spotifySecureFetch } from "@/lib/spotify";
import TrackList from "./lists/TrackList";

export default function SpotifyPlaylist({playlist}) {
    const [photoURL, setPhotoURL] = useState("/default-pfp.jpg");

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
            <div className="flex items-end pb-6">
                <img alt="Playlist Image" width={200} height={200} className="rounded"
                    src={playlist?.images?.[0]?.url || "/no-image.png"}
                />
                <div className="truncate pl-4 pb-3">
                    <h1 className="truncate font-extrabold text-7xl overflow-visible pb-2">{playlist?.name}</h1>
                    <div className="flex pt-4 items-center font-semibold">
                        <img src={photoURL} alt="Owner photo" className="rounded-full w-8 h-8"/>
                        <h3 className="text-xl px-3">{playlist?.owner?.display_name}</h3>
                        <div className="text-[rgba(var(--color-fg),0.5)]">{playlist?.tracks?.total} tracks</div>
                    </div>
                </div>
            </div>
            <TrackList tracks={playlist?.tracks?.items?.map(item => item.track)} />
        </div>
    )
}