"use client";
import { useState, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

export default function PopularityWidget({ onChange, value = [0, 100] }) {
  const [popularity, setPopularity] = useState(Math.floor((value[0] + value[1]) / 2));
  const [focused, setFocused] = useState(true);

  const collapseRef = useRef(null);

  function handleCategory(cat) {
    let range;
    if (cat === "Mainstream") range = [80, 100];
    else if (cat === "Popular") range = [50, 79];
    else if (cat === "Underground") range = [0, 49];

    const mid = Math.floor((range[0] + range[1]) / 2);
    setPopularity(mid);
    onChange(range);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <CollapseArrow collapseRef={collapseRef} />
        <h5 className="font-semibold pb-1">Popularity</h5>
      </div>

      <div
        ref={collapseRef}
        style={{ maxHeight: focused ? `${collapseRef.current?.scrollHeight}px` : "0px" }}
        className="ml-6 overflow-hidden transition-[max-height] duration-300 ease-in-out space-y-4"
      >
        <div className="flex gap-2">
          {["Mainstream", "Popular", "Underground"].map(cat => (
            <button
              key={cat}
              className={`bg-[rgb(var(--color-bg))]  p-2 px-4 border-2 rounded-full ${
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

        <div className="flex items-center gap-2">
          <label className="w-24">Popularity:</label>
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
          <span className="w-8 text-right">{popularity}</span>
        </div>
      </div>
    </div>
  );
}
