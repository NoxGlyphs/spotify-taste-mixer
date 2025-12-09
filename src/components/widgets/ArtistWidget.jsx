"use client";
import { spotifySecureFetch } from "@/lib/spotify";
import { useState, useEffect } from "react";

export default function ArtistWidget({ onSelect, selectedItems = [] }) {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!query) return 
    const timeout = setTimeout(async () => {
      setLoading(true);
      const data = await spotifySecureFetch(`search?type=artist&q=${encodeURIComponent(query)}`);
      setArtists(data.artists.items.slice(0, 6));
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timeout);
  }, [query]);

  function handleClick(artist) {
    const alreadySelected = selectedItems.some(a => a.id === artist.id);
    if (alreadySelected) {
      onSelect(selectedItems.filter(a => a.id !== artist.id));
    } else if (selectedItems.length < 5) {
      onSelect([...selectedItems, artist]);
    }
  }

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search artists..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="border p-2 w-full mb-2"
        />
        <span onClick={() => setFocused(!focused)}>v</span>
      </div>

      {focused && (loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {artists.map(artist => (
            <div
              key={artist.id}
              className={`p-2 cursor-pointer border rounded flex items-center gap-2 ${
                selectedItems.some(a => a.id === artist.id) ? "bg-blue-200" : ""
              }`}
              onClick={() => handleClick(artist)}
            >
              {artist.images?.[0]?.url && (
                <img src={artist.images[0].url} className="w-12 h-12 object-cover rounded" />
              )}
              <span>{artist.name}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-2">
        {selectedItems.map(artist => (
          <div
            key={artist.id}
            className={`p-2 cursor-pointer border rounded flex items-center gap-2 ${
              selectedItems.some(a => a.id === artist.id) ? "bg-blue-200" : ""
            }`}
            onClick={() => handleClick(artist)}
          >
            {artist.images?.[0]?.url && (
              <img src={artist.images[0].url} className="w-12 h-12 object-cover rounded" />
            )}
            <span>{artist.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
