"use client";
import { useState } from "react";

export default function DecadeWidget({ onSelect, selectedItems = [] }) {
  const decades = [
    { label: "1950s", start: 1950, end: 1959 },
    { label: "1960s", start: 1960, end: 1969 },
    { label: "1970s", start: 1970, end: 1979 },
    { label: "1980s", start: 1980, end: 1989 },
    { label: "1990s", start: 1990, end: 1999 },
    { label: "2000s", start: 2000, end: 2009 },
    { label: "2010s", start: 2010, end: 2019 },
    { label: "2020s", start: 2020, end: 2029 }
  ];

  const [custom, setCustom] = useState({ start: "", end: "" });
  const [query, setQuery] = useState("");
  const filtered = decades.filter(d =>
    d.label.toLowerCase().includes(query.toLowerCase())
  );

  function toggle(item) {
    const exists = selectedItems.some(
      s => s.start === item.start && s.end === item.end
    );
    if (exists) {
      onSelect(selectedItems.filter(s => !(s.start === item.start && s.end === item.end)));
    } else {
      onSelect([...selectedItems, item]);
    }
  }

  function addCustom() {
    if (!custom.start || !custom.end) return;
    const newItem = { label: `${custom.start}-${custom.end}`, start: Number(custom.start), end: Number(custom.end) };
    const exists = selectedItems.some(
      s => s.start === newItem.start && s.end === newItem.end
    );
    if (!exists) onSelect([...selectedItems, newItem]);
    setCustom({ start: "", end: "" });
  }

  return (
    <div className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Search decades..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        {filtered.map(d => (
          <div
            key={d.label}
            className={`p-2 border rounded cursor-pointer ${
              selectedItems.some(s => s.label === d.label) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggle(d)}
          >
            {d.label}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Start year"
          value={custom.start}
          onChange={e => setCustom({ ...custom, start: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="End year"
          value={custom.end}
          onChange={e => setCustom({ ...custom, end: e.target.value })}
        />
        <button className="border px-3 rounded" onClick={addCustom}>+</button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {selectedItems.map(i => (
          <div
            key={`${i.start}-${i.end}`}
            className="p-2 border rounded cursor-pointer bg-blue-200"
            onClick={() => toggle(i)}
          >
            {i.label}
          </div>
        ))}
      </div>
    </div>
  );
}
