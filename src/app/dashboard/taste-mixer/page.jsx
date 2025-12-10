"use client";
import { useState, useRef } from "react";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import MoodWidget from "@/components/widgets/MoodWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
import { generatePlaylist } from "@/lib/spotify";
import NewPlaylist from "@/components/NewPlaylist";
import CollapseArrow from "@/components/CollapseArrow";

export default function TasteMixerPage() {
    const [showFilters, setShowFilters] = useState(true);
    const [filters, setFilters] = useState({
        artists: [],
        tracks: [],
        genres: [],
        decades: [],
        mood: [],
        popularity: [0, 100]
    });
    const [generateLoading, setGenerateLoading] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState(null);
    const [newPlaylistVisible, setNewPlaylistVisible] = useState(false);

    const filtersRef = useRef(null);

    function updateFilter(key, value) {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    function handleArtistSelect(val) { updateFilter("artists", val); }
    function handleTrackSelect(val) { updateFilter("tracks", val); }
    function handleGenreSelect(val) { updateFilter("genres", val); }
    function handleDecadeSelect(val) { updateFilter("decades", val); }
    function handleMoodSelect(val) { updateFilter("mood", val); }
    function handlePopularityChange(val) { updateFilter("popularity", val); }

    function handleGenerate() {
        setShowFilters(false);
        setNewPlaylistVisible(true);

        async function generate() {
            setGenerateLoading(true);
            const newPlaylistGenerated = await generatePlaylist(filters);
            setNewPlaylist(newPlaylistGenerated);
            setGenerateLoading(false);
        }
        generate();
    }

    return (
        <section className="p-6 rounded-lg">
            <div className="pt-4 p-4 rounded-lg">
                <div className="flex p-2 rounded">
                    <CollapseArrow collapseRef={filtersRef} />
                    <h3 className="font-semibold pb-6">Filters</h3>
                </div>
                <div ref={filtersRef} className="flex flex-col gap-6 overflow-hidden ml-6 transition-max-height duration-300 ease-in-out pr-6">
                    <ArtistWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onSelect={handleArtistSelect}
                        selectedItems={filters.artists}
                    />
                    <TrackWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onSelect={handleTrackSelect}
                        selectedItems={filters.tracks}
                    />
                    <GenreWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onSelect={handleGenreSelect}
                        selectedItems={filters.genres}
                    />
                    <DecadeWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onSelect={handleDecadeSelect}
                        selectedItems={filters.decades}
                    />
                    <MoodWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onSelect={handleMoodSelect}
                        selectedItems={filters.mood}
                    />
                    <PopularityWidget
                        className="bg-[rgb(var(--color-bg))] p-4 rounded-lg"
                        onChange={handlePopularityChange}
                        value={filters.popularity}
                    />
                </div>
            </div>
            <button onClick={handleGenerate}
                className="my-10 px-4 py-2 rounded-full border-2 border-[rgb(var(--color-fg))] bg-gradient-to-b from-[rgba(var(--secondary-color),0.3)] via-[rgba(var(--secondary-color),0.6)] to-[rgba(var(--secondary-color),0.4)] text-[rgb(var(--color-fg))] font-bold text-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ">
                Generate playlist
            </button>

            {newPlaylistVisible && (
                (newPlaylist?.length === 0) ? (
                    <p className="bg-[rgb(var(--color-bg))] p-4 rounded">No playlist generated. Try adjusting your filters.</p>
                ) : (
                    <NewPlaylist playlist={newPlaylist} alreadyCreated={false} />
            ))}
        </section>
    )
}
