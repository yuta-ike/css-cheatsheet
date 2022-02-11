import React, { useState } from "react"
import classNames from "classnames"
import useId from "@/utils/useId"

export type ButtonRenderArgs = {
  expanded: boolean
  props: {
    id: string
    "aria-expanded": boolean
    "aria-controls": string
    onClick: () => void
  }
}

export type AccordionProps = {
  buttonRender: (args: ButtonRenderArgs) => React.ReactNode
  children: React.ReactNode | ((expanded: boolean) => React.ReactNode)
  defaultExpanded?: boolean
  className?: string
}

const Accordion = ({
  buttonRender,
  children,
  defaultExpanded = false,
  className,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const buttonId = useId()
  const bodyId = useId()

  return (
    <div className={className}>
      <h2 className="w-full">
        {buttonRender({
          expanded,
          props: {
            id: buttonId,
            "aria-expanded": expanded,
            "aria-controls": bodyId,
            onClick: () => setExpanded((expanded) => !expanded),
          },
        })}
      </h2>
      <div
        id={bodyId}
        aria-labelledby={buttonId}
        aria-hidden={!expanded}
        className={classNames(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[999px] ease-in" : "max-h-0 ease-out",
        )}
      >
        {typeof children === "function" ? children(expanded) : children}
      </div>
    </div>
  )
}

export default Accordion
