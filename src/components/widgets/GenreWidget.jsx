"use client";
import { useState, useRef } from "react";
import CollapseArrow from "../CollapseArrow";

const GENRES = [
  'acoustic','afrobeat','alt-rock','alternative','ambient','anime','black-metal',
  'bluegrass','blues','bossanova','brazil','breakbeat','british','cantopop',
  'chicago-house','children','chill','classical','club','comedy','country',
  'dance','dancehall','death-metal','deep-house','detroit-techno','disco',
  'disney','drum-and-bass','dub','dubstep','edm','electro','electronic','emo',
  'folk','forro','french','funk','garage','german','gospel','goth','grindcore',
  'groove','grunge','guitar','happy','hard-rock','hardcore','hardstyle',
  'heavy-metal','hip-hop','house','idm','indian','indie','indie-pop',
  'industrial','iranian','j-dance','j-idol','j-pop','j-rock','jazz','k-pop',
  'kids','latin','latino','malay','mandopop','metal','metal-misc','metalcore',
  'minimal-techno','movies','mpb','new-age','new-release','opera','pagode',
  'party','philippines-opm','piano','pop','pop-film','post-dubstep',
  'power-pop','progressive-house','psych-rock','punk','punk-rock','r-n-b',
  'rainy-day','reggae','reggaeton','road-trip','rock','rock-n-roll','rockabilly',
  'romance','sad','salsa','samba','sertanejo','show-tunes','singer-songwriter',
  'ska','sleep','songwriter','soul','soundtracks','spanish','study','summer',
  'swedish','synth-pop','tango','techno','trance','trip-hop','turkish',
  'work-out','world-music'
];

export default function GenreWidget({ selectedItems = [], onSelect, limit = 5 }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const resultsRef = useRef(null);

  const filtered = GENRES.filter(g =>
    g.toLowerCase().includes(query.toLowerCase())
  );

  function toggle(g) {
    if (selectedItems.includes(g)) {
      onSelect(selectedItems.filter(x => x !== g));
    } else if (selectedItems.length < limit) {
      onSelect([...selectedItems, g]);
    }
  }

  return (
    <div>
      <div className="flex">
        <CollapseArrow collapseRef={resultsRef} />
        <h5 className="font-semibold pb-1">Select up to {limit} genres</h5>
      </div>

      <div className="ml-6">
        <input
          type="text"
          placeholder="Search genres..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="border p-2 w-full mb-2 rounded-full px-6"
        />

        {focused && (
          <div
            ref={resultsRef}
            className="max-h-64 overflow-hidden grid grid-cols-5 gap-2 space-y-1 transition-max-height duration-300 ease-in-out"
          >
            {filtered.slice(0,25).map(g => (
              <div
                key={g}
                className={`p-2 cursor-pointer border-2 rounded text-center ${
                  selectedItems.includes(g) ? "bg-blue-200" : ""
                }`}
                onClick={() => toggle(g)}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </div>
            ))}
            <div className="py-2" />
          </div>
        )}

        <div>
          {selectedItems.map(g => (
            <div
              key={g}
              className="p-2 flex items-center gap-2 pl-6 pr-10"
            >
              <span className="font-semibold">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
              <div className=" border-t border-[rgba(var(--color-border),0.6)] grow"/>
              <span
                onClick={() => toggle(g)}
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
