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
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedMood, setSelectedMood] = useState([]);
    const [popularity, setPopularity] = useState([0, 100]);

    const [generateLoading, setGenerateLoading] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState(null);
    const [newPlaylistVisible, setNewPlaylistVisible] = useState(false);

    function handleArtistSelect(artists) {
        setSelectedArtists(artists);
    }
    function handleTrackSelect(tracks) {
        setSelectedTracks(tracks);
    }
    function handleGenreSelect(genres) {
        setSelectedGenres(genres);
    }
    function handleDecadeSelect(decades) {
        setSelectedDecades(decades);
    }
    function handleMoodSelect(moods) {
        setSelectedMood(moods);
    }
    function handlePopularityChange(value) {
        setPopularity(value);
    }

    function handleGenerate() {
        const filters = {
            artists: selectedArtists,
            tracks: selectedTracks,
            genres: selectedGenres,
            decades: selectedDecades,
            popularity: popularity,
        }

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
                        selectedItems={selectedArtists}
                    />
                    <TrackWidget
                        onSelect={handleTrackSelect}
                        selectedItems={selectedTracks}
                    />
                    <GenreWidget
                        onSelect={handleGenreSelect}
                        selectedItems={selectedGenres}
                    />
                    <DecadeWidget
                        onSelect={handleDecadeSelect}
                        selectedItems={selectedDecades}
                    />
                    <MoodWidget
                        onSelect={handleMoodSelect}
                        selectedItems={selectedMood}
                    />
                    <PopularityWidget
                        onChange={handlePopularityChange}
                        value={popularity}
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