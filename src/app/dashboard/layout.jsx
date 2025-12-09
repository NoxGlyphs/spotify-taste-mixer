import Sidebar from "@/components/Sidebar"
import TitleURL from "@/components/TitleURL"
import Searchbar from "@/components/Searchbar"
import "../globals.css"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <Sidebar/>
      <div className="flex-grow flex flex-col">
        <header className="flex justify-between relative w-full">
          <TitleURL />
          <Searchbar/>
          <div className="flex">
            <p>BOTON MODO OSCURO</p>
            <p>LOGO</p>
          </div>
        </header>
        <main className="max-h-max flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
