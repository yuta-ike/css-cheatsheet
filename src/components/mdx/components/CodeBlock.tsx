import React, { useRef, useState } from "react"
// import "prismjs/themes/prism-tomorrow.min.css"
import { CheckIcon, DuplicateIcon } from "@heroicons/react/outline"
import { copyToClipboard } from "@/utils/clipboard"
import classNames from "classnames"

export type CodeBlockProps = React.ComponentProps<"pre">

const CodeBlock = ({ className, ...props }: CodeBlockProps) => {
  const [showComplete, setShowComplete] = useState(false)
  const preRef = useRef<HTMLPreElement | null>(null)

  const handleCopyToClipboard = async () => {
    if (preRef.current == null) {
      return
    }
    try {
      await copyToClipboard(preRef.current.innerText)
      setShowComplete(true)
      setTimeout(() => setShowComplete(false), 3000)
    } catch {
      // do nothing
    }
  }

  return (
    <div
      className="group relative mb-4"
      onPointerLeave={() => setTimeout(() => setShowComplete(false), 100)}
    >
      <pre
        {...props}
        ref={preRef}
        className={classNames(
          "peer !m-0 block overflow-x-scroll rounded border border-white/10 !bg-slate-700 p-4 pr-8 !text-sm focus:outline-none focus-visible:border-sky-400",
          className,
        )}
      >
        {props.children}
      </pre>
      <button
        className="absolute top-0 right-0 m-0.5 rounded-sm p-1 text-white/60 opacity-0 transition hover:text-white focus:outline-none focus-visible:text-white focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-sky-400 group-hover:opacity-100 peer-focus:opacity-100"
        onClick={handleCopyToClipboard}
        aria-label="ソースコードをクリップボードにコピー"
      >
        {showComplete ? (
          <CheckIcon className="h-6 w-6 text-green-500" />
        ) : (
          <DuplicateIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}

export default CodeBlock
