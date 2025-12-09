"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import ArtistWidget from "@/components/widgets/ArtistWidget"
import AccountManager from "@/components/AccountManager"
import Searchbar from "@/components/Searchbar"
import { refreshAccessToken } from "@/lib/auth"

export default function DashboardPage(){

    useEffect(()=>{
        refreshAccessToken()
    }, [])

    return (
        <main>
            <h1>estoy en dashboard landing</h1>
            <ArtistWidget />
        </main>
    )
}
