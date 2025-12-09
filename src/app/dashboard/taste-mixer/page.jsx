"use client";
import { useState } from "react";
import ArtistWidget from "@/components/widgets/ArtistWidget";

export default function TasteMixerPage() {
    const [selectedArtists, setSelectedArtists] = useState([]);

    function handleArtistSelect(artists) {
        setSelectedArtists(artists);
    }

    return (
        <section>
            <h2>Taste Mixer</h2>
            <ArtistWidget
                onSelect={handleArtistSelect}
                selectedItems={selectedArtists}
            />
        </section>
    )
}