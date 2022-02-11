import React from "react"
import classNames from "classnames"

export type DemoBoxProps = {
  children: React.ReactNode
  className?: string
}

const DemoBox = ({ children, className }: DemoBoxProps) => {
  return (
    <div
      className={classNames(
        "overflow-x-scroll rounded border border-white/10 bg-gray-800 p-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default DemoBox
