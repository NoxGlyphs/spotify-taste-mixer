"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { spotifySecureFetch } from "@/lib/spotify"

export default function SearchTracksPage() {
  const params = useParams()
  const query = params?.query || ""
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState("")

  useEffect(() => {
    async function fetchPlaylists() {
      const res = await spotifySecureFetch("/me/playlists", { params: { limit: 50 } })
      setPlaylists(res.items)
      if (res.items.length) setSelectedPlaylist(res.items[0].id)
    }
    fetchPlaylists()
  }, [])

  useEffect(() => {
    if (!query) return
    
    async function searchTracks() {
      setLoading(true)
      const res = await spotifySecureFetch("/search", {
        params: { q: decodeURIComponent(query), type: "track", limit: 10 }
      })
      setTracks(res.tracks.items)
      setLoading(false)
    }
    
    searchTracks()
  }, [query])

  async function addToPlaylist(trackUri) {
    if (!selectedPlaylist) return alert("Selecciona una playlist")
    await spotifySecureFetch(`/playlists/${selectedPlaylist}/tracks`, {
      method: "POST",
      body: { uris: [trackUri] }
    })
    alert("Added to playlist")
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-semibold">
          Select a playlist to add tracks:
        </h2>
        <select
          value={selectedPlaylist}
          onChange={e => setSelectedPlaylist(e.target.value)}
          className="border p-2 rounded w-60 ml-auto"
        >
          {playlists.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando...</p>}

      <div className="grid grid-cols-1 gap-2">
        {tracks.map(track => (
          <div
            key={track.id}
            className="flex items-center gap-2 border p-2 rounded bg-[rgb(var(--color-bg))]"
          >
            {track.album?.images?.[0]?.url && (
              <img
                src={track.album.images[0].url}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex flex-col truncate">
              <span className="font-semibold truncate">{track.name}</span>
              <span className="truncate text-sm opacity-70">
                {track.artists.map(a => a.name).join(", ")}
              </span>
            </div>
            <button
              onClick={() => addToPlaylist(track.uri)}
              className="ml-auto px-3 py-1 border rounded bg-blue-200 hover:bg-blue-300"
            >
              Añadir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
