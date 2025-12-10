import Sidebar from "@/components/Sidebar"
import TitleURL from "@/components/TitleURL"
import Searchbar from "@/components/Searchbar"
import ThemeToggle from "@/components/ThemeToggle"

import "../globals.css"
import Logo from "@/components/Logo"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <Sidebar/>
      <div className="relative grow flex flex-col overflow-y-auto overflow-x-hidden  ">
        <div className="fixed inset-0 bg-[url('/frutiger.png')] bg-cover bg-no-repeat bg-[position:100px_-350px] z-[-1] opacity-15"/>
        <header className="items-center pb-4 sticky top-0 flex justify-between w-full pl-6 pr-2 pt-2 z-30 ">
          <div className="pointer-events-none absolute w-full h-[200%] top-[0%] z-[-1] bg-[linear-gradient(180deg,rgb(var(--color-bg))_0%,rgb(var(--color-bg))_20%,rgba(var(--color-bg),0.8)_50%,transparent_100%)]"/>
          <TitleURL />
          <Searchbar/>
          <div className="hidden sm:flex h-fit items-center gap-2">
            <ThemeToggle />
            <Logo/>
          </div>
        </header>
        <main className="max-h-max flex-1 pl-6 pt-4">
          {children}
        </main>
      </div>
    </div>
  )
}
