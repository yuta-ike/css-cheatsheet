import React from "react"

export type ListItemProps = React.ComponentProps<"li">

export const ListItem = ({ children, ...props }: ListItemProps) => {
  return (
    <li {...props} className="pl-6 indent-[-1.5em] leading-[1.9] text-twhite-100 ">
      <span className="inline-flex h-1 w-[1.5em] -translate-y-1/2">
        <span className="mx-auto h-[3px] w-[3px] rounded-full bg-twhite-100" />
      </span>
      {children}
    </li>
  )
}

// before:absolute before:left-0 before:top-0
