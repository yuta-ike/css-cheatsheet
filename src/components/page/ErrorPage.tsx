import React from "react"

export type ErrorPage = {
  errorCode: string
  title: string
  children: React.ReactNode
}

const ErrorPage = ({ errorCode, title, children }: ErrorPage) => {
  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <section className="mb-8 space-y-6 rounded-xl border border-slate-700 bg-slate-700/30 py-8 px-16">
        <div className="space-y-2">
          <h1 className="text-2xl">
            <span className="text-4xl font-bold">{errorCode}</span>
            <span className="mx-3">|</span>
            <span>{title}</span>
          </h1>
          <p>
            <code>{globalThis.location?.href ?? ""}</code>
          </p>
        </div>
        {children}
      </section>
    </div>
  )
}

export default ErrorPage
