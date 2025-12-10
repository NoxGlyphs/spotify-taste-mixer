"use client";
import { useState } from "react";

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

  const filtered = GENRES.filter(g =>
    g.toLowerCase().includes(query.toLowerCase())
  );

  function toggle(g) {
    if (selectedItems.includes(g)) {
      onSelect(selectedItems.filter(x => x !== g));
    } else {
      if (selectedItems.length >= limit) return;
      onSelect([...selectedItems, g]);
    }
  }

  return (
    <div className="space-y-2">
      <input
        className="border p-2 w-full"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="buscar género..."
      />

      <div className="max-h-64 overflow-y-auto border p-2 space-y-1">
        {filtered.map(g => (
          <div
            key={g}
            className={`p-2 cursor-pointer ${
              selectedItems.includes(g) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggle(g)}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}
