"use client";
import { spotifySecureFetch } from "@/lib/spotify";
import { useState, useEffect, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

export default function ArtistWidget({ onSelect, selectedItems = [] }) {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const resultsRef = useRef(null);

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
        <CollapseArrow collapseRef={resultsRef} />
        <h5 className="font-semibold pb-1">Select up to 5 artist</h5>
      </div>

      <div className="ml-6">
        <input
            type="text"
            placeholder="Search artists..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            className="border p-2 w-full mb-2 rounded-full px-6"
          />

        {focused && (loading ? (
          <p>Loading...</p>
        ) : (
          <div ref={resultsRef} className="grid grid-cols-2 gap-2 overflow-hidden transition-max-height duration-300 ease-in-out">
            {artists.map(artist => (
              <div
                key={artist.id}
                className={`p-2 cursor-pointer border-2 rounded flex items-center gap-2 ${
                  selectedItems.some(a => a.id === artist.id) ? "bg-blue-200" : ""
                }`}
                onClick={() => handleClick(artist)}
              >
                {artist.images?.[0]?.url && (
                  <img src={artist.images[0].url} className="w-12 h-12 object-cover rounded-full border border-[rgb(var(--color-border))]" />
                )}
                <span className="font-semibold">{artist.name}</span>
              </div>
            ))}
            <div className="py-2"/>
          </div>
        ))}

        <div className="flex">
          {selectedItems.map(artist => (
            <div
              key={artist.id}
              className={`p-2 flex flex-col justify-center text-center items-center gap pl-6 pr-10`}
            >
              {artist.images?.[0]?.url && (
                <img src={artist.images[0].url} className="w-24 h-24 object-cover rounded-full" />
              )}
              <span className="mt-2 font-semibold">{artist.name}</span>
              <span onClick={() => handleClick(artist)}
              className="text-sm text-[rgba(var(--color-fg),0.3)] cursor-pointer">Remove</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
