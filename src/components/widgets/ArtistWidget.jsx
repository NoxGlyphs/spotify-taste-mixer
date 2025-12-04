"use client"
import { spotifySecureFetch } from "@/lib/spotify"
import { useState, useEffect } from "react"

const TOP_50_GLOBAL_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

export default function ArtistWidget(){

  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadArtists() {
    setLoading(true)
    const res = await spotifySecureFetch("/me/top/artists?limit=10&offset=0")
    console.log(res, "ARTISTS")
    // setArtists(data.artists)
    const userTop = await spotifySecureFetch(res.href)

    if (userTop.items && userTop.items.length > 0) {
        setArtists(userTop.items)
        console.log(userTop.items, "USER TOP ARTISTS")
      } else {
        // 2️⃣ Si no hay top artists, usar Top 50 Global
        const playlistLink = await spotifySecureFetch(`https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFz6FAsUtgAab`)
        // Extraer artistas únicos de los tracks
        const playlist = await spotifySecureFetch(playlistLink.href)
        console.log(playlist, "TOP 50 GLOBAL ARTISTS")
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
          <div key={a.id}>{a.name}</div>
        ))}
      </div>
    </div>
  );
}