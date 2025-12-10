"use client";
import { useState, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

const MOODS = [
  { id: "happy", label: "Happy" },
  { id: "sad", label: "Sad" },
  { id: "energetic", label: "Energetic" },
  { id: "calm", label: "Calm" }
];

const EXTRAS = {
  happy: ["dance", "pop", "party"],
  sad: ["rainy-day", "acoustic", "piano"],
  energetic: ["edm", "rock", "work-out"],
  calm: ["ambient", "chill", "sleep"]
};

export default function MoodWidget({ selectedItems = [], onSelect }) {
  const [focused, setFocused] = useState(true);
  const [energy, setEnergy] = useState(50);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [acousticness, setAcousticness] = useState(50);

  const collapseRef = useRef(null);

  function toggleMood(m) {
    const exists = selectedItems.includes(m.id);
    const updated = exists
      ? selectedItems.filter(i => i !== m.id)
      : [...selectedItems, m.id];
    onSelect(updated);
  }

  const generatedGenres = selectedItems.flatMap(m => EXTRAS[m] || []);

  return (
    <div>
      <div className="flex items-center gap-2">
        <CollapseArrow collapseRef={collapseRef} />
        <h5 className="font-semibold pb-1">Select moods & parameters</h5>
      </div>

      <div className="ml-6">
        <div
          ref={collapseRef}
          style={{ maxHeight: focused ? `${collapseRef.current?.scrollHeight}px` : "0px" }}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out space-y-4"
        >
          <div className="grid grid-cols-2 gap-2">
            {MOODS.map(m => (
              <div
                key={m.id}
                className={`bg-[rgb(var(--color-bg))]  p-2 cursor-pointer border-2 rounded flex items-center justify-center ${
                  selectedItems.includes(m.id) ? "bg-blue-200" : ""
                }`}
                onClick={() => toggleMood(m)}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="space-y-2 grid grid-cols-2 gap-4 font-semibold">
            <div>
              <div className="flex items-center justify-between">
                <label>Energy</label>
                <span>{energy}</span>
              </div>
              <input type="range" min="0" max="100" value={energy} onChange={e => setEnergy(Number(e.target.value))} className="w-full" />
            </div>

            <div>           
              <div className="flex items-center justify-between">
                <label>Valence</label>
                <span>{valence}</span>
              </div>
              <input type="range" min="0" max="100" value={valence} onChange={e => setValence(Number(e.target.value))} className="w-full" />
              </div> 
            <div>
              <div className="flex items-center justify-between">
                <label>Danceability</label>
                <span>{danceability}</span>
              </div>
              <input type="range" min="0" max="100" value={danceability} onChange={e => setDanceability(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label>Acousticness</label>
                <span>{acousticness}</span>
              </div>
              <input type="range" min="0" max="100" value={acousticness} onChange={e => setAcousticness(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {generatedGenres.map(g => (
            <div key={g} className="p-2 border rounded bg-green-200">
              {g}
            </div>
          ))}
        </div>

        <div className="mt-2">
          {selectedItems.map((m, i) => (
            <div key={`${m}-${i}`} className="p-2 flex items-center gap-2 pl-6 pr-10">
              <span>{MOODS.find(x => x.id === m)?.label || m}</span>
              <div className="border-t border-[rgba(var(--color-border),0.6)] grow" />
              <span
                onClick={() => onSelect(selectedItems.filter(x => x !== m))}
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
