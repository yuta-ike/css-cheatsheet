import InlineCode from "@/components/mdx/components/InlineCode"
import { MDXProvider } from "@mdx-js/react"
import Head from "next/head"
import CodeBlock from "./components/CodeBlock"
import { H1, H2, H3 } from "./components/Heading"
import { ListItem } from "./components/List"
import Section from "./components/Section"
import { Table, TableData, TableHeader, TableRow } from "./components/Table"
import Typography from "./components/Typography"
import { Marker } from "./components/Strong"
import { Anchor } from "./components/Anchor"
import React, { useEffect, useRef, useState } from "react"
import Toc from "../Toc"

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Typography,
  pre: CodeBlock,
  li: ListItem,
  section: Section,
  code: InlineCode,
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableData,
  strong: Marker,
  a: Anchor,
}

export type Meta = {
  title: string
  description: string
  category: string
}

export type ComponentsProviderProps = {
  meta: Meta
  children: React.ReactNode
  headings: { id: string; value: string; children: { id: string; value: string }[] }[]
}

const MDXComponentsProvider = ({ meta, children, headings }: ComponentsProviderProps) => {
  const [currentTocId, setCurrentTocId] = useState(meta.title)
  useEffect(() => {
    const option = {
      rootMargin: "0px 0px -85% 0px",
      threshold: 1.0,
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentTocId(entry.target.id)
        }
      })
    }, option)
    const ids = [
      meta.title,
      ...headings.map(({ id, children }) => [id, children.map(({ id }) => id)]).flat(2),
    ]
    ids.forEach((id) => {
      const target = document.querySelector(`#${id.replaceAll(/%/g, "\\%")}`)
      if (target != null) {
        observer.observe(target)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>{meta.title} - CSS CheetBook</title>
      </Head>
      <article className="mx-auto flex w-full flex-row-reverse py-12 xl:max-w-[70rem]">
        <div className="hidden w-72 shrink-0 pl-8 pr-4 xl:block">
          <Toc
            currentId={currentTocId}
            className="sticky top-12"
            headings={[{ id: meta.title, value: "Quick Reference", children: [] }, ...headings]}
          />
        </div>
        <div className="w-full pl-12 pr-12 xl:w-[calc(100%-18rem)] xl:max-w-[52rem] xl:pr-4">
          <div className="flex justify-between">
            <div className="flex flex-col" id={meta.title}>
              <p className="text-sm font-bold text-sky-400">{meta.category}</p>
              <h1 className="mt-1 mb-5 text-4xl font-bold">{meta.title}</h1>
              <p className="text-sm text-twhite-50">{meta.description}</p>
            </div>
          </div>
          <div className="mt-6">
            <MDXProvider components={components}>{children}</MDXProvider>
          </div>
        </div>
      </article>
    </>
  )
}

export default MDXComponentsProvider
