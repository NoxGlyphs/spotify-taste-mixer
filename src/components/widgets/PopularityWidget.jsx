"use client";
import { useState } from "react";

export default function PopularityWidget({ onChange, value = [0, 100] }) {
  const [popularity, setPopularity] = useState(value);

  function handleCategory(cat) {
    let range;
    if (cat === "Mainstream") range = [80, 100];
    else if (cat === "Popular") range = [50, 79];
    else if (cat === "Underground") range = [0, 49];

    setPopularity((range[0] + range[1]) / 2);
    onChange(range);
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
          const val = Number(e.target.value);
          setPopularity(val);
          const min = Math.max(0, val - 10);
          const max = Math.min(100, val + 10);
          onChange([min, max]);
        }}
        className="w-full"
      />

      <p>Popularity: {popularity}</p>
    </div>
  );
}
