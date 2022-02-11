const matter = require("gray-matter")
const fs = require("fs")
const path = require("path")

const regexp = /\|\|([^\|\s]+)\|\|/g

module.exports = function (source) {
  let { data: meta, content } = matter(source)
  const title = meta.title ?? ""
  const description = meta.description ?? ""
  const slug = meta.slug ?? ""
  const category = meta.category ?? ""

  const filenames = content.match(regexp)

  if (filenames) {
    for (const filename of filenames) {
      const code = fs.readFileSync(
        path.join(path.dirname(this.resourcePath), filename.slice(2, -2)),
      )
      const ext = filename.slice(2, -2).split(".")[filename.slice(2, -2).split(".").length - 1]
      content = content.replaceAll(filename, `\n\`\`\`${ext}\n${code}\n\`\`\`\n`)
    }
  }

  const _source = [
    `import MDXComponentsProvider from "@/components/mdx/MDXProvider.tsx"`,
    `import "prismjs/themes/prism-tomorrow.min.css"`,
    content,
    `export default ({ children }) => {
      return <MDXComponentsProvider meta={${JSON.stringify({
        title,
        description,
        slug,
        category,
      })}}
      headings={headings} /* NOTE: headingsはtoc-extractで挿入される */
      >{children}</MDXComponentsProvider>
    }`,
  ].join("\n")

  return _source
}
