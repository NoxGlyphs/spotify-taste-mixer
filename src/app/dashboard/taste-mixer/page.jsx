"use client";
import { useState } from "react";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";

export default function TasteMixerPage() {
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    function handleArtistSelect(artists) {
        setSelectedArtists(artists);
    }
    function handleTrackSelect(tracks) {
        setSelectedTracks(tracks);
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
        </section>
    )
}