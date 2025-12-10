"use client";
import { useState } from "react";

export default function MoodWidget({ onSelect, selectedItems = [] }) {
  const moods = [
    { id: "happy", label: "Happy" },
    { id: "sad", label: "Sad" },
    { id: "energetic", label: "Energetic" },
    { id: "calm", label: "Calm" }
  ];

  const extras = {
    happy: ["dance", "pop", "party"],
    sad: ["rainy-day", "acoustic", "piano"],
    energetic: ["edm", "rock", "work-out"],
    calm: ["ambient", "chill", "sleep"]
  };

  const [energy, setEnergy] = useState(50);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [acousticness, setAcousticness] = useState(50);

  function toggleMood(m) {
    const exists = selectedItems.includes(m.id);
    const updated = exists
      ? selectedItems.filter(i => i !== m.id)
      : [...selectedItems, m.id];
    onSelect(updated);
  }

  const generatedGenres = selectedItems.flatMap(m => extras[m] || []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {moods.map(m => (
          <div
            key={m.id}
            className={`p-2 border rounded cursor-pointer ${
              selectedItems.includes(m.id) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggleMood(m)}
          >
            {m.label}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <input type="range" min="0" max="100" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full" />
        <input type="range" min="0" max="100" value={valence} onChange={e => setValence(e.target.value)} className="w-full" />
        <input type="range" min="0" max="100" value={danceability} onChange={e => setDanceability(e.target.value)} className="w-full" />
        <input type="range" min="0" max="100" value={acousticness} onChange={e => setAcousticness(e.target.value)} className="w-full" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {generatedGenres.map(g => (
          <div key={g} className="p-2 border rounded bg-green-200">
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}
