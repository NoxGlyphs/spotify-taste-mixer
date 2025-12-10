"use client";
import { spotifySecureFetch } from "@/lib/spotify";
import { useState, useEffect, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

export default function TrackWidget({ onSelect, selectedItems = [] }) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const resultsRef = useRef(null);

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
    } else if (selectedItems.length < 5) {
      onSelect([...selectedItems, track]);
    }
  }

  return (
    <div>
      <div className="flex">
        <CollapseArrow collapseRef={resultsRef} />
        <h5 className="font-semibold pb-1">Select up to 5 tracks</h5>
      </div>

      <div className="ml-6">
        <input
          type="text"
          placeholder="Search tracks..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="border p-2 w-full mb-2 rounded-full px-6 bg-[rgb(var(--color-bg))] "
        />

        {focused && (loading ? (
          <p>Loading...</p>
        ) : (
          <div
            ref={resultsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden transition-max-height duration-300 ease-in-out"
          >
            {tracks.map(track => (
              <div
                key={track.id}
                className={`bg-[rgb(var(--color-bg))]  p-2 cursor-pointer border-2 rounded flex items-center gap-2 ${
                  selectedItems.some(t => t.id === track.id) ? "bg-blue-200" : ""
                }`}
                onClick={() => handleClick(track)}
              >
                {track.album?.images?.[0]?.url && (
                  <img
                    src={track.album.images[0].url}
                    className="w-12 h-12 object-cover rounded border border-[rgb(var(--color-border))]"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold">{track.name}</span>
                  <span className="text-sm opacity-70">
                    {track.artists?.[0]?.name}
                  </span>
                </div>
              </div>
            ))}
            <div className="py-2" />
          </div>
        ))}

        <div>
          {selectedItems.map(track => (
            <div
              key={track.id}
              className="p-2 flex items-center gap-2 pl-6 pr-10"
            >
              {track.album?.images?.[0]?.url && (
                <img
                  src={track.album.images[0].url}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{track.name}</span>
                <span className="text-sm opacity-70">{track.artists?.[0]?.name}</span>
              </div>
              <div className="border-t border-[rgba(var(--color-border),0.6)] grow"/>
              <span
                onClick={() => handleClick(track)}
                className="text-sm ml-auto text-[rgba(var(--color-fg),0.3)] cursor-pointer"
              >
                Remove
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
