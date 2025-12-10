"use client";
import { useState } from "react";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import MoodWidget from "@/components/widgets/MoodWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
import { generatePlaylist } from "@/lib/spotify";
import NewPlaylist from "@/components/NewPlaylist";

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
        <section>
            <h2>Taste Mixer</h2>
            <div>
                <div className="flex">
                    <span>v</span>
                    <h3>Filters</h3>
                </div>
                <div>
                    <ArtistWidget
                        onSelect={handleArtistSelect}
                        selectedItems={filters.artists}
                    />
                    <TrackWidget
                        onSelect={handleTrackSelect}
                        selectedItems={filters.tracks}
                    />
                    <GenreWidget
                        onSelect={handleGenreSelect}
                        selectedItems={filters.genres}
                    />
                    <DecadeWidget
                        onSelect={handleDecadeSelect}
                        selectedItems={filters.decades}
                    />
                    <MoodWidget
                        onSelect={handleMoodSelect}
                        selectedItems={filters.mood}
                    />
                    <PopularityWidget
                        onChange={handlePopularityChange}
                        value={filters.popularity}
                    />
                </div>
            </div>
            <button onClick={handleGenerate}>Generate playlist</button>

            {newPlaylistVisible && (
                (newPlaylist?.length === 0) ? (
                    <p>No playlist generated. Try adjusting your filters.</p>
                ) : (
                <NewPlaylist playlist={newPlaylist} alreadyCreated={false} />
            ))}
        </section>
    )
}