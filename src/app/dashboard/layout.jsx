import Sidebar from "@/components/Sidebar"
import Library from "@/components/Library"
import "../globals.css"

export default function DashboardLayout({ children }) {


  return (
    <div className="flex w-screen h-screen">
      <Sidebar/>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}
