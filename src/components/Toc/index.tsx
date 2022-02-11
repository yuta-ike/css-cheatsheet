import classNames from "classnames"
import React from "react"
import MenuItem from "./MenuItem"

export type TocLeafItem = {
  id: string
  value: string
}

export type TocItem = TocLeafItem & {
  children: TocLeafItem[]
}

export type TocProps = {
  headings: TocItem[]
  currentId: string | null
  className?: string
}

const Toc = ({ headings, currentId, className }: TocProps) => {
  return (
    <aside className={classNames(className, "space-y-4 text-twhite-50")}>
      <h2 className="px-4 font-bold tracking-wider text-twhite-200">contents</h2>
      <ol className="space-y-1 text-sm">
        {headings.map(({ id, value, children }) => (
          <li key={id} id={id} className="space-y-1">
            <MenuItem id={id} value={value} selected={currentId === id} />
            <ol className="ml-4 space-y-2 empty:hidden">
              {children.map(({ id, value }) => (
                <li key={id}>
                  <MenuItem id={id} value={value} selected={currentId === id} />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export default Toc
