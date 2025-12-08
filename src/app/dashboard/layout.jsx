import Topbar from "@/components/Topbar"
import Library from "@/components/Library"

export default function DashboardLayout({ children }) {


  return (
    <div style={{ padding: 20 }}>
        <Topbar />
        <main className="flex">
            <Library />
            <div>{children}</div>
        </main>
    </div>
  )
}
