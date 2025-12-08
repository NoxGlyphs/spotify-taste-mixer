"use client"
import Searchbar from "./Searchbar"
import AccountManager from "./AccountManager"

export default function Topbar() {

    
    function handleSearch(query){
        console.log("Searching for:", query)
    }

    return (
        <nav className="flex justify-between items-center">
            {/* <Logo /> */}
            <h2>LOGO</h2>
            <div className="mx-auto">
                <Searchbar onSearch={ handleSearch } />
            </div>
            <AccountManager />
        </nav>
    )
}