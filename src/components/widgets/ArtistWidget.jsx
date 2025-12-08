"use client"
import { spotifySecureFetch } from "@/lib/spotify"
import { useState, useEffect } from "react"
import ArtistCard from "../ArtistCard"

const TOP_50_GLOBAL_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

export default function ArtistWidget(){

  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadArtists() {
    setLoading(true)
    const userTop = await spotifySecureFetch("/me/top/artists", { params: { limit: 50, offset: 0 } })

    if (userTop.items && userTop.items.length > 9) {
        setArtists(userTop.items)
    } else { // REVISAR ESTO
      const playlistLink = await spotifySecureFetch(`https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFz6FAsUtgAab`)
      const playlist = await spotifySecureFetch(playlistLink.href)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadArtists()
  }, []);

  return (
    <div>
      <button onClick={loadArtists} disabled={loading}>
        {loading ? "Cargando..." : "Actualizar recomendaciones"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {artists.map(a => (
          <ArtistCard key={a.id} artistData={a}/>
        ))}
      </div>
    </div>
  );
}