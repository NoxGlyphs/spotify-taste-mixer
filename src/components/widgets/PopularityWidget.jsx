"use client";
import { useState } from "react";

export default function PopularityWidget({ onChange, value = 50 }) {
  const [popularity, setPopularity] = useState(value);

  function handleCategory(cat) {
    let val;
    if (cat === "Mainstream") val = 90;
    else if (cat === "Popular") val = 65;
    else if (cat === "Underground") val = 25;
    setPopularity(val);
    onChange(val);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["Mainstream", "Popular", "Underground"].map(cat => (
          <button
            key={cat}
            className={`p-2 border rounded ${
              (cat === "Mainstream" && popularity >= 80) ||
              (cat === "Popular" && popularity >= 50 && popularity < 80) ||
              (cat === "Underground" && popularity < 50)
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={popularity}
        onChange={e => {
          setPopularity(Number(e.target.value));
          onChange(Number(e.target.value));
        }}
        className="w-full"
      />

      <p>Popularity: {popularity}</p>
    </div>
  );
}
