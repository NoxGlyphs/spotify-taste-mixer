import axios from "axios";
import { getAccessToken, refreshAccessToken } from "./auth";

/* -------------------------------------------------- */

export async function spotifySecureFetch(endpoint, options = {}) {
  let token = getAccessToken(); 

  if (!token) {
    token = await refreshAccessToken();
    if (!token) throw new Error("No access token available");
  }

  if( endpoint.startsWith("http")) {
    if( !endpoint.includes("https://api.spotify.com/v1")) {
      throw new Error("Invalid Spotify API endpoint, must start with https://api.spotify.com/v1. Use just axios for other URLs.");
    }
  }else if( endpoint.startsWith("/") ) {
    endpoint = "https://api.spotify.com/v1" + endpoint
  }else{
    endpoint = "https://api.spotify.com/v1/" + endpoint
  }

  try {
    const res = await axios({
      url: endpoint,
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      params: options.params,
      data: options.data
    });

    return res.data;

  } catch {
    const newToken = await refreshAccessToken();
    if (!newToken) throw new Error("Unable to refresh token");

    const retry = await axios({
      url: endpoint,
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      },
      params: options.params,
      data: options.data
    });
    
    return retry.data;
  }

}

/* -------------------------------------------------- */

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity } = preferences;
  const token = getAccessToken();
  let allTracks = [];

  // 1. Obtener top tracks de artistas seleccionados
  for (const artist of artists) {
    const tracks = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    const data = await tracks.json();
    allTracks.push(...data.tracks);
  }

  // 2. Buscar por géneros
  for (const genre of genres) {
    const results = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    const data = await results.json();
    allTracks.push(...data.tracks.items);
  }

  // 3. Filtrar por década
  if (decades.length > 0) {
    allTracks = allTracks.filter(track => {
      const year = new Date(track.album.release_date).getFullYear();
      return decades.some(decade => {
        const decadeStart = parseInt(decade);
        return year >= decadeStart && year < decadeStart + 10;
      });
    });
  }

  // 4. Filtrar por popularidad
  if (popularity) {
    const [min, max] = popularity;
    allTracks = allTracks.filter(
      track => track.popularity >= min && track.popularity <= max
    );
  }

  // 5. Eliminar duplicados y limitar a 30 canciones
  const uniqueTracks = Array.from(
    new Map(allTracks.map(track => [track.id, track])).values()
  )

  function shuffle(a) {
    let i = a.length;
    while (i > 0) {
      const j = Math.floor(Math.random() * i);
      i--;
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  shuffle(uniqueTracks)

  return uniqueTracks.slice(0, 20);
}