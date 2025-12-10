"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { spotifySecureFetch } from "@/lib/spotify"
import TrackList from "@/components/lists/TrackList"

export default function HomePage() {
  const router = useRouter()
  const [topArtists, setTopArtists] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopItems() {
      try {
        setLoading(true)
        
        // Obtener top artistas de todo el tiempo
        const artists = await spotifySecureFetch("/me/top/artists", {
          params: { limit: 10, time_range: "long_term" }
        })
        
        // Obtener top canciones de todo el tiempo
        const tracks = await spotifySecureFetch("/me/top/tracks", {
          params: { limit: 20, time_range: "long_term" }
        })
        
        setTopArtists(artists?.items || [])
        setTopTracks(tracks?.items || [])
      } catch (error) {
        console.error("Error fetching top items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTopItems()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <section className="space-y-10 pr-4">
      {/* Top Artists */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Top Artists</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-10 gap-y-6 pr-4">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className="w-40 cursor-pointer text-center"
              onClick={() => router.push(`/dashboard/artist/${artist.id}`)}
            >
              <img
                src={artist.images?.[0]?.url || "/default-pfp.jpg"}
                alt={artist.name}
                className="w-40 h-40 rounded-full border-1 border-[rgb(var(--color-border))] mb-1 object-cover shadow-sm/30"
              />
              <h5 className="font-semibold truncate">{artist.name}</h5>
              <span className="text-[rgb(var(--color-fg),0.4)] text-sm">
                {artist.followers?.total?.toLocaleString()} followers
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Top Tracks</h2>
        <TrackList tracks={topTracks} numerated={true} />
      </div>
    </section>
  )
}
