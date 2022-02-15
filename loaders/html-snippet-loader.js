const fs = require("fs")
const path = require("path")

module.exports = function (source) {
  const file = path.basename(this.resourcePath).match(/(?<filename>.+)\.(?<ext>[^\,]+)/)?.groups

  const css = fs
    .readFileSync(path.join(path.dirname(this.resourcePath), `./${file.filename}.module.css`))
    .toString()

  const cssLinesEntries = css.split("\n").entries()
  let processedCss = ""
  let cssHighlight = []
  let cssHighlightStartIndex = null
  let cssId = 0
  for (const [i, line] of cssLinesEntries) {
    if (/^\s*\/\*\s+@\s+\*\/\s*$/.test(line)) {
      cssHighlight.push(cssId + 1)
    } else if (/^\s*\/\*\s+@@\s+\*\/\s*$/.test(line)) {
      cssHighlightStartIndex = cssId + 1
    } else if (/^\s*\/\*\s+\/@@\s+\*\/\s*$/.test(line) && cssHighlightStartIndex != null) {
      cssHighlight.push(
        ...Array(cssId + 1 - cssHighlightStartIndex)
          .fill(null)
          .map((_, i) => i + cssHighlightStartIndex),
      )
    } else {
      processedCss += (i === 0 ? "" : "\n") + line
      cssId += 1
    }
  }

  const htmlLinesEntries = source.split("\n").entries()
  let processedHtml = ""
  let htmlHighlightStartIndex = null
  let htmlHighlight = []
  let htmlId = 0
  for (const [i, line] of htmlLinesEntries) {
    if (/^\s*\<\!--\s+@\s+--\>\s*$/.test(line)) {
      htmlHighlight.push(htmlId + 1)
      // delete htmlLinesEntries[i]
    } else if (/^\s*\<\!--\s+@@\s+--\>\s*$/.test(line)) {
      htmlHighlightStartIndex = htmlId + 1
      // delete htmlLinesEntries[i]
    } else if (/^\s*\<\!--\s+\/@@\s+--\>\s*$/.test(line) && htmlHighlightStartIndex != null) {
      htmlHighlight.push(
        ...Array(htmlId + 1 - htmlHighlightStartIndex)
          .fill(null)
          .map((_, i) => i + htmlHighlightStartIndex),
      )
    } else {
      processedHtml += (i === 0 ? "" : "\n") + line
      htmlId += 1
    }
  }

  return `
import styles from "./${file.filename}.module.css"

\`\`\`html
${processedHtml.replace(`\``, `\\\``).trim()}
\`\`\`

\`\`\`css
${processedCss.replace(`\``, `\\\``).trim()}
\`\`\`

export const source = [
  {
    ext: "html",
    content: \`${processedHtml.replace(`\``, `\\\``).trim()}\`,
    highlight: ${JSON.stringify(htmlHighlight)},
  },
  {
    ext: "css",
    content: \`${processedCss.replace(`\``, `\\\``).trim()}\`,
    highlight: ${JSON.stringify(cssHighlight)},
  },
]

export const Preview = () => (
  <>
    ${
      processedHtml
        .replace(
          /class=\"([^\"]+)\"/g,
          `className={"$1".split(" ").map(cls => styles[cls]).join(" ")}`,
        )
        .trim() /* TODO: react系のメソッドで書き換え */
    }
  </>
)`
}

// const css = fs.readFileSync(path.dirname(this.resourcePath) + "/style.module.css")

// return `
// import styles from "./style.module.css"
// import "prismjs/themes/prism-tomorrow.min.css"

// export default {
//   source: {
//     html: \`${source}\`,
//     css: \`${css}\`,
//   },
//   jsx: (
//     <>
//       ${source.replace(/class=\"(.+)\"/g, `className={styles["$1"]}`)}
//     </>
//   ),
// }`
