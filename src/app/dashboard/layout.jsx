import Sidebar from "@/components/Sidebar"
import TitleURL from "@/components/TitleURL"
import Searchbar from "@/components/Searchbar"
import ThemeToggle from "@/components/ThemeToggle"
import "../globals.css"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <Sidebar/>
      <div className="relative grow flex flex-col overflow-y-auto">
        <header className="sticky top-0 flex justify-between w-full px-6">
          <TitleURL />
          <Searchbar/>
          <div className="flex">
            <ThemeToggle />
            <p>LOGO</p>
          </div>
        </header>
        <main className="max-h-max flex-1 pl-6 pt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
