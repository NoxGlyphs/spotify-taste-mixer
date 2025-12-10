"use client";
import { useState } from "react";

export default function TrackList({ tracks, removeTrack = null, numerated = true }) {
    
    function msToMinutesAndSeconds(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60;
        return minutes + " : " + (seconds<10 ? "0" : "")+ seconds;
    }

    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
    });

    // Guardar favoritos en localStorage
    const toggleFavorite = (track) => {
        const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]')
        const isFavorite = favorites.find(f => f.id === track.id)
        let updated

        if (isFavorite) {
            updated = favorites.filter(f => f.id !== track.id)
        } else {
            updated = [...favorites, track];
        }

        setFavorites(updated);
        localStorage.setItem('favorite_tracks', JSON.stringify(updated))
    }

    return (
    <div>
      {tracks?.length === 0 ? (
        <p>No tracks to display.</p>
      ) : (
        <ul>
          {tracks?.map((track, index) =>{ 
            const isFav = favorites.some(f => f.id === track.id);
            
            return (
                <li key={track.id} className="flex gap-2 items-center">
                    <span className="w-[3ch] text-center">{numerated && (index + 1)}</span>
                    <img src={track.image} alt="Portada" width={40} height={40}/>
                    <span> {track.name} - {track.artists?.map(a => a.name).join(", ")}</span>
                    <span>{msToMinutesAndSeconds(track.duration_ms)}</span>
                    <span onClick={()=>removeTrack(track.id)}> Remove </span>
                    <span className={`relative right-0 cursor-pointer ${isFav ? 'text-yellow-400 font-bold' : ''}`}
                        onClick={() => toggleFavorite(track)}
                    >
                        FAV
                    </span>
                </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
