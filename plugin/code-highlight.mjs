import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { modifyChildren } from "unist-util-modify-children"

/** @type {import("unified").Plugin} */
export const codeHighlight = () => {
  /** @type {(tree: import("unist").Node, file: import("vfile").VFileCompatible) => void} */
  return (tree, file) => {
    visit(tree, "element", codeVisitor)
    visit(tree, (node) => node?.properties?.className?.includes?.("color"), hexColorVisitor)
  }
}

/** @type {(node: import("mdast").Paragraph, index: number, parent?: import("unist").Parent)} */
function codeVisitor(node, index, parent) {
  if (node.tagName !== "code") {
    return
  }

  /** @type {number[]} */
  const brIndexes = [0]

  // NOTE: nodeの真ん中に改行がある場合、分割する
  for (const [i, child] of node.children.entries()) {
    if (child.value != null && /.+\n.+/.test(child.value)) {
      node.children.splice(
        i,
        1,
        ...[
          ...child.value.match(/(\n*).+/g).map((str, i) => ({
            ...child,
            value: str,
          })),
          // NOTE ↑の正規表現だと最後の改行が失われてしまうので、応急処置的に追加している
          child.value.match(/(\n+)$/)
            ? { ...child, value: child.value.match(/(\n+)$/)[0] }
            : undefined,
        ].filter((str) => str != null),
      )
    }
  }

  // NOTE: 行頭に改行がある場合、分割する
  for (const [i, child] of node.children.entries()) {
    if (child?.value?.startsWith("\n")) {
      node.children.splice(
        i,
        1,
        {
          ...child,
          value: "\n",
        },
        {
          ...child,
          value: child.value.slice(1),
        },
      )
    }
  }

  for (const [i, child] of node.children.entries()) {
    if (child?.value?.startsWith("\n") || node.children?.[i - 1]?.value?.endsWith("\n")) {
      brIndexes.push(i)
    }
  }

  brIndexes.reverse()
  for (const [i, brIndex] of brIndexes.entries()) {
    if (i === 0) {
      continue
    }

    const children = [...node.children.slice(brIndex, brIndexes[i - 1])]

    // NOTE: 改行コードのみを含むノード かつ 直前のノードが改行コードで終わらない 場合はlineとみなさない
    const isNotLine =
      children.length === 1 &&
      children[0].value === "\n" &&
      !getLastValue(node.children[brIndex - 1])?.endsWith("\n")

    const newNode = {
      type: "element",
      value: undefined,
      tagName: "span",
      children,
      properties: {
        class: isNotLine ? "token" : "token line",
      },
    }

    const isHighlighted = detectHighlight(newNode)

    if (isHighlighted) {
      newNode.properties.class += " highlight"
    }

    node.children.splice(brIndex, brIndexes[i - 1] - brIndex, newNode)
  }
}

const detectHighlight = (tree) => {
  if (tree.value != null) {
    const match = tree.value.match(/^(\n)?\!\s/)
    if (match) {
      tree.value = tree.value.replace(/^(\n)?\!\s/, "$1")
      return true
    }
    return false
  }
  if (tree.children == null) {
    return false
  }

  for (const child of tree.children) {
    const res = detectHighlight(child)
    if (res) {
      return true
    }
  }
}

const getLastValue = (tree) => {
  if (tree == null) {
    return
  }
  if (tree.value != null && typeof tree.value === "string") {
    return tree.value.slice(-1)
  }
  if (tree.children == null) {
    return
  }

  for (let i = tree.children.length - 1; 0 <= i; i--) {
    const res = getLastValue(tree.children[i])
    if (res != null) {
      return res
    }
  }
}

function hexColorVisitor(node, index, parent) {
  const color = toString(node)
  node.children.unshift({
    type: "element",
    tagName: "span",
    properties: {
      "aria-hidden": "true",
      className: ["token", "color-preview"],
      style: {
        background: color,
      },
    },
  })
}
