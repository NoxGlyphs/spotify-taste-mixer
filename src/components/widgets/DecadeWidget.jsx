"use client";
import { useState, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

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
  const [focused, setFocused] = useState(true);

  const collapseRef = useRef(null);

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
      <div className="flex items-center gap-2">
        <CollapseArrow collapseRef={collapseRef} />
        <h5 className="font-semibold pb-1">Select decades</h5>
      </div>

      <div className="ml-6">
        <div
          ref={collapseRef}
          style={{ maxHeight: focused ? `${collapseRef.current?.scrollHeight}px` : "0px" }}
          className="overflow-auto transition-[max-height] duration-300 ease-in-out grid grid-cols-2 gap-2"
        >
          {decades.map(d => (
            <div
              key={d.label}
              className={`p-2 cursor-pointer border-2 rounded ${
                selectedItems.some(s => s.label === d.label) ? "bg-blue-200" : ""
              }`}
              onClick={() => toggle(d)}
            >
              {d.label}
            </div>
          ))}
          <div className="py-2" />
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="number"
            className="border p-2 w-40"
            placeholder="Start year"
            value={custom.start}
            onChange={e => setCustom({ ...custom, start: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 w-40"
            placeholder="End year"
            value={custom.end}
            onChange={e => setCustom({ ...custom, end: e.target.value })}
          />
          <button className="border px-3 rounded" onClick={addCustom}>+</button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {selectedItems.map(i => (
            <div
              key={`${i.start}-${i.end}`}
              className="p-2 flex items-center gap-2 pl-2 pr-2 border rounded bg-blue-200"
              onClick={() => toggle(i)}
            >
              {i.label}
              <span
                onClick={() => toggle(i)}
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
