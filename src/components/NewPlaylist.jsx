"use client"
import { useState, useEffect, useRef } from "react"
import { spotifySecureFetch } from "@/lib/spotify";
import TrackList from "./lists/TrackList";
import Logo from "./Logo";

export default function NewPlaylist({playlist}) {
    const inputRef = useRef(null);
    const [tracks, setTracks] = useState([]);

    // Permitir remover canciones específicas de la playlist
    const removeTrack = (trackId) => {
        setTracks(tracks.filter(track => track.id !== trackId))
    }

    function handleSaveInSpotify() {
        async function savePlaylist() {
            const playlistName = inputRef.current.value || "Taste Mix";
            const currentUser = await spotifySecureFetch('/me');
            console.log(currentUser);
            const newPlaylist = await spotifySecureFetch(`/users/${currentUser.id}/playlists`, {
                method: 'POST',
                data: JSON.stringify({
                    name: playlistName,
                    public: false,
                    description: 'Spotify Taste Mixer playlist'
                }),
            });
            const trackUris = tracks.map(track => track.uri)
            await spotifySecureFetch(`/playlists/${newPlaylist.id}/tracks`, {
                method: 'POST',
                data: JSON.stringify({
                    uris: trackUris
                }),
            });
            alert(`Playlist "${playlistName}" saved in your Spotify account!`);

        }
        savePlaylist();
    }

    useEffect(() => { 
        async function setup() {
            const fetchedTracks = playlist?.map(item => {
                return {
                    name: item.name,
                    uri: item.uri,
                    image: item.album?.images?.[0]?.url || null,
                    artists: item.artists,
                    id: item.id,
                    duration_ms: item.duration_ms
                }
            });
            setTracks(fetchedTracks);
        }
        setup();
    }, [playlist]);

    return (
        <div>
            <div className="flex items-center  pb-6">
                <h3 className="font-semibold text-2xl pr-2 py-2">Title:</h3>
                <input type="text" 
                    defaultValue="Taste Mix" 
                    className="bg-[rgb(var(--color-bg))]  border p-2 w-fit font-semibold text-2xl rounded" 
                    ref={inputRef}
                />
                <div className="fixed right-10 bottom-10 flex items-center cursor-pointer w-fit rounded-full border-3 py-2 px-4 bg-[rgb(var(--color-bg))] z-9999" onClick={handleSaveInSpotify}>
                    <h4 className="font-bold text-2xl mr-2">Save in Spotify</h4>
                    <Logo />
                </div>
            </div>

            
            <TrackList tracks={tracks} removeTrack={removeTrack} />
            <div className="py-15"/>
        </div>
    )
}