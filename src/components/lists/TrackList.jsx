"use client";
import { useEffect, useState } from "react";

export default function TrackList({ tracks, removeTrack = null, numerated = true }) {
    
    function msToMinutesAndSeconds(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60;
        return minutes + " : " + (seconds<10 ? "0" : "")+ seconds;
    }

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setFavorites( JSON.parse(window.localStorage.getItem('favorite_tracks') || '[]'))
    }, []);

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
            console.log(track.track?.album?.images?.[0])
            
            return (
                <li key={track.id} className=" block sm:flex gap-2 items-center mt-4 pb-6 sm:pb-0">
                    <span className="hidden sm:flex min-w-[3ch] text-center text-[rgba(var(--color-fg),0.5)]">{numerated && (index + 1)}</span>
                    <img className="rounded" src={track.image || track.album?.images?.[0]?.url} alt="Portada" width={60} height={60}/>
                    
                    <div className="truncate">
                      <div className="truncate font-semibold"> {track.name}</div>
                      <span className="truncate text-[rgba(var(--color-fg),0.5)]">{msToMinutesAndSeconds(track.duration_ms)} - {track.artists?.map(a => a.name).join(", ")}</span>

                    </div>
                    <span className={`relative right-0 cursor-pointer `}
                        onClick={() => toggleFavorite(track)}
                    >
                      <svg
                        height="46"
                        width="46"
                        viewBox="-102.94 -102.94 587.13 587.13"
                        fill="none"
                        stroke={isFav ? "rgb(var(--secondary-color))" : "#000000"}
                        strokeWidth="50"
                      >
                        <g>
                          <g>
                            <path
                              d="M191.847,360.957c-4.648,0-9.076-1.784-12.447-5.024c-0.245-0.233-29.256-28.289-146.439-145.472
                              l-0.817-0.817c-1.205-1.193-1.796-1.88-2.387-2.572C10.621,186.384,0,159.48,0,131.483C0,70.173,49.883,20.29,111.193,20.29
                              c30.091,0,58.672,12.113,79.425,33.444c20.759-21.332,49.346-33.444,79.437-33.444c61.31,0,111.193,49.883,111.193,111.193
                              c0,30.723-12.31,59.305-34.673,80.535c-0.328,0.382-0.627,0.686-0.847,0.901C227.6,331.045,205.195,355.002,204.98,355.229
                              c-3.288,3.514-7.9,5.597-12.674,5.716L191.847,360.957z M111.199,32.23c-54.734,0-99.259,44.525-99.259,99.259
                              c0,24.983,9.499,49.012,26.744,67.664c0.585,0.674,1.002,1.164,1.886,2.041l0.835,0.835
                              C158.552,319.177,187.413,347.084,187.67,347.334c1.128,1.086,2.596,1.683,4.135,1.695l0.251-0.006
                              c1.557-0.042,3.109-0.74,4.207-1.915c0.173-0.191,22.764-24.339,141.009-142.584l0.859-0.925
                              c20.114-18.969,31.195-44.578,31.195-72.104c0-54.734-44.525-99.259-99.259-99.259c-28.862,0-56.166,12.477-74.914,34.238
                              l-4.523,5.245l-4.523-5.251C167.365,44.707,140.066,32.23,111.199,32.23z"
                            />
                          </g>
                        </g>
                      </svg>

                    </span>
                    {removeTrack && (
                      <>
                        <span className="border-t grow min-w-10 text-[rgba(var(--color-fg),0.5)]"/>
                        <span onClick={()=>removeTrack(track.id)} className="font-semibold mr-4 text-[rgba(var(--color-fg),0.5)] cursor-pointer"> Remove </span>
                      </>
                    )}

                </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
