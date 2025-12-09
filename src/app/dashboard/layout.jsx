import Sidebar from "@/components/Sidebar"
import TitleURL from "@/components/TitleURL"
import Searchbar from "@/components/Searchbar"
import "../globals.css"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar/>
      <div className="flex-grow">
        <header className="flex justify-between relative w-full">
          <TitleURL />
          <Searchbar/>
          <div className="flex">
            <p>BOTON MODO OSCURO</p>
            <p>LOGO</p>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
