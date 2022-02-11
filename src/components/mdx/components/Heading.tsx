import { HashtagIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import Link from "next/link"
import React from "react"

type HeadingBaseProps = React.ComponentProps<"h1"> & {
  as: `h${1 | 2 | 3 | 4 | 5 | 6}`
}

export const HeadingBase = ({ as: Component, className, ...props }: HeadingBaseProps) => {
  const id = props.id ?? `${props.children}`
  return (
    <Component
      {...props}
      id={id}
      className={classNames("relative scroll-mt-8 text-twhite-400", className)}
    >
      <span className="peer block -translate-x-2 pl-2">{props.children}</span>
      {id != null && (
        <Link href={`#${id}`}>
          <a
            className="absolute right-full top-1/2 mr-2 -translate-y-1/2 rounded bg-white/5 p-1 opacity-0 transition hover:opacity-100 hover:ring hover:ring-sky-400 focus:opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-400 peer-hover:opacity-100"
            aria-label="アンカー"
          >
            <HashtagIcon className="h-4 w-4" />
          </a>
        </Link>
      )}
    </Component>
  )
}

export type HeadingProps = React.ComponentProps<"h1">

export const H1 = (props: HeadingProps) => {
  return <HeadingBase as="h2" {...props} className="text-2xl font-bold" />
}

export const H2 = (props: HeadingProps) => {
  return <HeadingBase as="h3" {...props} className="font-bold" />
}

export const H3 = (props: HeadingProps) => {
  return <HeadingBase as="h3" {...props} className="text-sm font-bold" />
}
