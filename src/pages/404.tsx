import ErrorPage from "@/components/page/ErrorPage"
import Link from "next/link"
import React from "react"

const NotFoundPage = () => {
  return (
    <ErrorPage errorCode="404" title="Not Found">
      <div className="space-y-3">
        <p>URLに間違いがないかご確認ください。</p>
        <p className="text-sm">
          <Link href="/">
            <a className="text-sky-400 underline decoration-transparent transition hover:decoration-sky-400">
              トップページへ戻る
            </a>
          </Link>
          <span className="mx-3">|</span>
          <a
            href="#"
            className="underline decoration-transparent transition hover:decoration-twhite-400"
          >
            不具合報告
          </a>
        </p>
      </div>
    </ErrorPage>
  )
}

export default NotFoundPage
