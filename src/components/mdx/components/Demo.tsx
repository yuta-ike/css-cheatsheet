import React, { useEffect, useRef } from "react"
import classNames from "classnames"
import DemoBox from "./DemoBox"
import styles from "./Demo.module.css"
import useKeyDown from "@/utils/useKeyDown"
import useCycleState from "@/utils/useCycleState"
import useEffectExceptFirst from "@/utils/useEffectExceptFirst"
import useId from "@/utils/useId"

export type DemoProps = {
  initTab?: number
  source: {
    ext: string
    content: string
    highlight: number[]
  }[]
  demo: React.ReactNode
  children: React.ReactNode
  className?: string
  backgroundWhite?: boolean
}

const Demo = ({
  children,
  demo,
  source,
  initTab = 0,
  className,
  backgroundWhite = false,
}: DemoProps) => {
  const {
    state: selectedTab,
    setState: setSelectedTab,
    setFirst,
    setLast,
    setNext,
    setPrev,
  } = useCycleState(
    source.map((_, i) => i),
    initTab,
  )
  const id = useId()

  const tabWrapperRef = useRef<HTMLDivElement | null>(null)
  const tabs = useRef<HTMLButtonElement[]>([])

  useEffect(() => {
    const childrenCollection = tabWrapperRef.current?.children
    if (childrenCollection == null) {
      return
    }
    const children = Array.from(childrenCollection)
    const selectedTabElm = children[selectedTab]

    // タブの表示を制御する
    children.forEach((node) => {
      node.setAttribute("aria-hidden", "true")
      node.classList.remove(styles.selected)
    })
    // @ts-ignore
    selectedTabElm.setAttribute("aria-hidden", "false")
    selectedTabElm.classList.add(styles.selected)

    // 選択されていないタブパネルのフォーカスを禁止する
    // tabWrapperRef.current
    //   ?.querySelectorAll("pre, button")
    //   ?.forEach((node) => node.setAttribute("tabindex", "-1"))
    // tabWrapperRef.current
    //   ?.querySelectorAll(`.${styles.selected} > *`)
    //   ?.forEach((node) => node.setAttribute("tabindex", "0"))
  }, [selectedTab])

  // フォーカス制御
  useEffectExceptFirst(() => {
    tabs.current[selectedTab].focus({ preventScroll: true })
  }, [selectedTab])

  // 初回のプロパティ設定
  useEffect(() => {
    const tabWrapper = tabWrapperRef.current
    if (tabWrapper == null) {
      return
    }
    const children = tabWrapper.children
    //@ts-ignore
    Array.from(children).forEach((node, i) => {
      node.setAttribute("role", "tabpanel")
      node.setAttribute("id", `panel${id}-${i}`)
      node.setAttribute("aria-labelledby", `$tab${id}-${i}`)
    })

    source.forEach(({ highlight }, i) => {
      const lines = Array.from(
        tabWrapper.querySelectorAll(`#panel${id.replaceAll(":", "\\:")}-${i} .line.token`),
      )
      highlight.forEach((target) => {
        lines[target - 1]?.classList?.add?.("highlight")
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // キー押下時の処理
  const onKeyDown = useKeyDown({
    Home: () => setFirst(),
    End: () => setLast(),
    ArrowRight: () => setNext(),
    ArrowLeft: () => setPrev(),
  })

  return (
    <div className={classNames(className, "!mt-4")}>
      <DemoBox backgroundWhite={backgroundWhite}>{demo}</DemoBox>
      <div>
        <div className="mt-4 flex items-center justify-between">
          <div className="grid grid-cols-2 gap-x-1" role="tablist" aria-label="デモのソースコード">
            {source.map(({ ext }, i) => (
              <button
                key={i}
                className={classNames(
                  "rounded-sm border px-2 py-1 text-xs font-bold tracking-tighter focus:outline-none focus-visible:ring focus-visible:ring-sky-400",
                  selectedTab === i
                    ? "border-sky-400/40 bg-sky-400/10 text-sky-400"
                    : "border-transparent",
                )}
                onClick={() => setSelectedTab(i)}
                role="tab"
                id={`tab${id}-${i}`}
                aria-controls={`panel${id}-${i}`}
                aria-selected={selectedTab === i}
                tabIndex={selectedTab === i ? 0 : -1}
                onKeyDown={onKeyDown}
                ref={(elm) => {
                  if (elm != null) {
                    tabs.current[i] = elm
                  }
                }}
              >
                {ext.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div
          id="tabwrapper"
          ref={tabWrapperRef}
          className={classNames(
            "mt-2 flex max-h-[320px] overflow-x-hidden overflow-y-scroll rounded border border-white/20 focus:outline-none focus-visible:border-sky-400",
            styles["tab-wrapper"],
          )}
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Demo
