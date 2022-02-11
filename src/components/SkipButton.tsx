import React from "react"

const SkipButton = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-slate-800/50 p-4 backdrop-blur-sm">
        <a href="#main" className="w-2/3 flex-1 py-2 text-center text-twhite-400">
          メインコンテンツへ移動する
        </a>
        <a href="#search" className="w-2/3 flex-1 py-2 text-center text-twhite-400">
          サイト内検索へ移動する
        </a>
      </div>
    </div>
  )
}

export default SkipButton
