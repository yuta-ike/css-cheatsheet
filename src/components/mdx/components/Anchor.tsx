import { ExternalLinkIcon } from "@heroicons/react/solid"
import Link from "next/link"

const outerLinkRegexp = /https?:\/\//

export type AnchorProps = React.ComponentProps<"a">
export const Anchor = ({ href, children, ...props }: AnchorProps) => {
  const isOuterLink = href == null || outerLinkRegexp.test(href)
  const anchor = (
    <a
      {...props}
      {...(isOuterLink ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="deecoration-sky-400 decoration mx-1 rounded-sm px-0.5 font-semibold text-twhite-400 underline decoration-sky-400 transition hover:text-white hover:decoration-sky-600 focus:outline-none focus-visible:no-underline focus-visible:ring-[2px] focus-visible:ring-sky-400"
    >
      {isOuterLink && <ExternalLinkIcon className="mr-0.5 inline h-4 w-4" />}
      <span>{children}</span>
    </a>
  )

  if (isOuterLink) {
    return anchor
  } else {
    return <Link href={href}>{anchor}</Link>
  }
}
