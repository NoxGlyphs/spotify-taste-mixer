"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import ArtistWidget from "@/components/widgets/ArtistWidget"
import AccountManager from "@/components/AccountManager"
import Searchbar from "@/components/Searchbar"

export default function DashboardPage(){
    return (
        <main>
            <h1>estoy en dashboard landing</h1>
            <ArtistWidget />
        </main>
    )
}
