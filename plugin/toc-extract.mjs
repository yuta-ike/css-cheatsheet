import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"

/** @type {()) => import("unified").Transformer} */
export const tocExtract = () => {
  /** @var {import("unified").Transformer} transformer */
  const transformer = (node) => {
    let headings = []
    visit(node, "element", function (node) {
      if (node.tagName === "h1" || node.tagName === "h2") {
        // TODO: unist-util-string
        const value = toString(node)
        const _id = encodeURIComponent(value)
        const id = /^\d/.test(_id) ? `_${_id}` : _id
        node.properties = {
          ...node.properties,
          id,
        }

        if (node.tagName === "h1") {
          headings.push({
            id,
            value,
            children: [],
          })
        } else if (node.tagName === "h2") {
          headings?.[headings.length - 1]?.children?.push({ id, value })
        }
      }
    })

    node.children.unshift({
      type: "mdxjsEsm",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              source: null,
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "headings" },
                    init: {
                      type: "ArrayExpression",
                      elements: headings.map((value) => ({
                        // NOTE: 本当はLiteralじゃないけどなんかいけてるのでこのままいく
                        type: "Literal",
                        value,
                      })),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    })
    return node
  }
  return transformer
}
