import React, { useEffect, useRef } from "react"
import classNames from "classnames"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"
import SIDEBAR_SECTIONS from "@/data/sidebar"
import Accordion from "@/components/base/Accordion"
import SearchBox from "./SearchBox"
import { useRouter } from "next/router"

export type SidebarContent = {
  className?: string
}

const SidebarContent = ({ className }: SidebarContent) => {
  const pathname = useRouter().pathname
  const searchBoxRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handelr = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        searchBoxRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handelr)
    return () => document.removeEventListener("keydown", handelr)
  }, [])

  return (
    <nav
      className={classNames("flex h-full w-full flex-col items-start bg-slate-800 pt-2", className)}
      aria-label="メニュー"
    >
      <div className="flex w-full items-center justify-center">
        <Link href="/">
          <a
            className="mx-4 my-2 flex w-full items-center space-x-3 rounded p-2 focus:outline-none focus-visible:bg-sky-300/20"
            aria-label="トップページ"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 font-bold text-twhite-400"
            >
              C
            </span>
            <p className="align-middle font-bold leading-none tracking-wide text-twhite-400">
              CSS CheetBook
              <span className="ml-2 rounded-sm bg-sky-600 px-1 text-sm">beta</span>
            </p>
          </a>
        </Link>
      </div>
      <div className="mt-2 w-full  px-4">
        <SearchBox id="search" ref={searchBoxRef} className="w-full" />
      </div>
      <ul className="mt-6 w-full space-y-1   pb-[100px]">
        {SIDEBAR_SECTIONS.map(({ id, title, sections }) => (
          <li key={id} className="w-full px-2">
            <Accordion
              className="w-full"
              buttonRender={({ expanded, props }) => (
                <button
                  {...props}
                  className={classNames(
                    "flex w-full items-center justify-between rounded py-2.5 px-2 text-left text-xs font-bold text-twhite-100 focus:outline-none",
                    !expanded && sections.some(({ id }) => `/${id}` === pathname)
                      ? "bg-sky-400/20 hover:bg-sky-300/30 focus-visible:bg-sky-300/30"
                      : "hover:bg-gray-400/20 focus-visible:bg-gray-400/20",
                  )}
                >
                  <span>{title}</span>
                  <ChevronDownIcon
                    className={classNames(
                      "h-4 w-4 text-twhite-50/70 transition-transform duration-200",
                      expanded && "rotate-180",
                    )}
                  />
                </button>
              )}
            >
              {(expanded) => (
                <ul className="my-2 flex flex-col space-y-1 pl-3">
                  {sections.map(({ id, ...props }) => {
                    const href = `/${id}`
                    return (
                      <li key={id}>
                        <Link href={href}>
                          <a
                            className={classNames(
                              "flex items-center justify-between rounded px-2 py-1.5 focus:outline-none",
                              pathname === href
                                ? "bg-sky-400/20 hover:bg-sky-300/30 focus-visible:bg-sky-300/30"
                                : "text-twhite-100 hover:bg-gray-400/20 focus-visible:bg-gray-400/20",
                            )}
                            tabIndex={expanded ? 0 : -1}
                            aria-current={pathname === href ? "page" : undefined}
                          >
                            <p className="mr-4 shrink-0 grow text-sm">
                              {props.type === "property" ? props.property : props.title}
                            </p>
                            {props.type === "property" && (
                              <p className="mt-1 pt-0.5 text-xs text-twhite-50">{props.label}</p>
                            )}
                            {props.type === "util" && props.subline != null && (
                              <p className="mt-1 pt-0.5 text-xs text-twhite-50">{props.subline}</p>
                            )}
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </Accordion>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SidebarContent
