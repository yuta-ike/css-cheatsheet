import React from "react"
import styles from "./inlineCode.module.css"

export type InlineCodeProps = React.ComponentProps<"code">

const InlineCode = ({ children, ...props }: InlineCodeProps) => {
  return (
    <code {...props} className={styles["markdown-code"]}>
      {children}
    </code>
  )
}

export default InlineCode
