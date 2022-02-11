import "../styles/globals.css"
import "../styles/highlight.css"
import type { AppProps } from "next/app"
import SidebarContent from "../components/Sidebar/SidebarContent"
import SkipButton from "@/components/SkipButton"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SkipButton />
      <div className="fixed inset-y-0 left-[max(0px,calc(50%-26rem-18rem))] w-72">
        <SidebarContent />
      </div>
      <main className="flex min-h-screen flex-col bg-slate-800 pl-72" id="main">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
