"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

export default function DashboardPage(){
    const [artists, setArtists] = useState([])
    const token = useRef(null)

    useEffect(() => {
        token.current = localStorage.getItem("spotify_token")
    }, [])

    useEffect(() => {
        const handleResponse = async () => {
            const response = await spotifyAPIFetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb")
            console.log(response)
        }
        handleResponse()
    }, [token])


    // meter todas las funciones de este estilo en lib spotify, todo lo que tenga que ver con la api spoi
    // ademas token si o si es ref y la funcione del fetch misma es la que debe asegurarse de pedir el token
    // de nuevo si no funciona y solo dar el error al cliente si es del todo imposible el fetch
    const spotifyAPIFetch = async (url) => {
        if (!token){
            console.log("No token available")
            return
        }
        
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        )   
        return response
    }

    return (
        <h1>estoy en dashboard</h1>
    )
}
