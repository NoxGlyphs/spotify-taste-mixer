"use client";
import { spotifySecureFetch } from "@/lib/spotify";
import { useState, useEffect } from "react";

export default function TrackWidget({ onSelect, selectedItems = [] }) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(async () => {
      setLoading(true);
      const data = await spotifySecureFetch(
        `search?type=track&q=${encodeURIComponent(query)}`
      );
      setTracks(data.tracks.items.slice(0, 6));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  function handleClick(track) {
    const alreadySelected = selectedItems.some(t => t.id === track.id);
    if (alreadySelected) {
      onSelect(selectedItems.filter(t => t.id !== track.id));
    } else {
      onSelect([...selectedItems, track]);
    }
  }

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search tracks..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="border p-2 w-full mb-2"
        />
        <span onClick={() => setFocused(!focused)}>v</span>
      </div>

      {focused &&
        (loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {tracks.map(track => (
              <div
                key={track.id}
                className={`p-2 cursor-pointer border rounded flex items-center gap-2 ${
                  selectedItems.some(t => t.id === track.id) ? "bg-blue-200" : ""
                }`}
                onClick={() => handleClick(track)}
              >
                {track.album?.images?.[0]?.url && (
                  <img
                    src={track.album.images[0].url}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <div className="font-semibold">{track.name}</div>
                  <div className="text-sm opacity-70">
                    {track.artists?.[0]?.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      <div className="grid grid-cols-2 gap-2 mt-2">
        {selectedItems.map(track => (
          <div
            key={track.id}
            className="p-2 cursor-pointer border rounded flex items-center gap-2 bg-blue-200"
            onClick={() => handleClick(track)}
          >
            {track.album?.images?.[0]?.url && (
              <img
                src={track.album.images[0].url}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div>
              <div className="font-semibold">{track.name}</div>
              <div className="text-sm opacity-70">
                {track.artists?.[0]?.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
