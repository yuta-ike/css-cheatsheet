import React from "react"
import classNames from "classnames"

export type DemoBoxProps = {
  children: React.ReactNode
  className?: string
  backgroundWhite?: boolean
}

const DemoBox = ({ children, className, backgroundWhite = false }: DemoBoxProps) => {
  return (
    <div
      className={classNames(
        "overflow-x-scroll rounded border border-white/10 p-4",
        backgroundWhite ? "bg-white" : "bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default DemoBox
