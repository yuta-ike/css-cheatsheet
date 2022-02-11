import classNames from "classnames"
import React from "react"

export type TypographyProps = React.ComponentProps<"p">

const Typography = (props: TypographyProps) => {
  return <p {...props} className={classNames("leading-[1.9] text-twhite-100", props.className)} />
}

export default Typography
