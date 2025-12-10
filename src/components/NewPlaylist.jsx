"use client"
import { useState, useEffect, useRef } from "react"
import { spotifySecureFetch } from "@/lib/spotify";
import TrackList from "./lists/TrackList";

export default function NewPlaylist({playlist}) {
    const inputRef = useRef(null);
    const [tracks, setTracks] = useState([]);
    console.log(playlist);

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
            <input type="text" 
                defaultValue="Taste Mix" 
                className="border p-2 w-full mb-4" 
                ref={inputRef}
            />
            <TrackList tracks={tracks} removeTrack={removeTrack} />
            <h4 onClick={handleSaveInSpotify}>Save in Spotify</h4>
        </div>
    )
}