"use client";
import { useState } from "react";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import MoodWidget from "@/components/widgets/MoodWidget";

export default function TasteMixerPage() {
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedMood, setSelectedMood] = useState([]);

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

    return (
        <section>
            <h2>Taste Mixer</h2>
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

        </section>
    )
}