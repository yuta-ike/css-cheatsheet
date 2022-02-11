import React from "react"

export type SectionProps = React.ComponentProps<"section">

const Section = (props: SectionProps) => {
  return <section {...props} className="!mt-8 space-y-2" />
}

export default Section
