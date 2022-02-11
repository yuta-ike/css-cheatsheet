import React, { forwardRef } from "react"
import classNames from "classnames"
import { SearchIcon } from "@heroicons/react/solid"
import useId from "@/utils/useId"

export type SearchBoxProps = React.ComponentProps<"input">

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(function SearchBoxInner(
  { className, ...props },
  ref,
) {
  const id = useId()
  return (
    <label className="relative flex cursor-text items-center rounded bg-white/10 px-2 text-sm text-twhite-400 focus-within:ring focus-within:ring-sky-400">
      <SearchIcon aria-label="検索" className="h-6 w-6 text-twhite-400/30" />
      <input
        id={id}
        type="text"
        placeholder="Quick search..."
        className={classNames("peer bg-transparent px-3 py-2 focus:outline-none", className)}
        required
        ref={ref}
        autoCorrect="false"
        {...props}
      />
      <div className="peer-focus:delay-400 absolute right-3 flex items-center space-x-0.5 text-twhite-400/70 opacity-0 transition-opacity peer-invalid:opacity-100 peer-focus:opacity-0">
        <kbd className="text-lg leading-none">⌘</kbd>
        <span className="sr-only">+</span>
        <kbd className="leading-none">K</kbd>
      </div>
    </label>
  )
})

export default SearchBox
