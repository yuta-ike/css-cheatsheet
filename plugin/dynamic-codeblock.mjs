// import { Transformer } from 'unified';
// import { Node } from 'unist';
// import { Root } from 'mdast';
// import findAndReplace from "mdast-util-find-and-replace"
import { visit } from "unist-util-visit"
import { mdxExpression } from "micromark-extension-mdx-expression"
import { micromark } from "micromark"
import { mdxjs } from "micromark-extension-mdxjs"
import { parse } from "acorn"

/** @type {()) => import("unified").Transformer} */
const dynamicCodeblock = () => {
  /** @var {import("unified").Transformer} transformer */
  const transformer = (node) => {
    console.log("==========#dynamicCodeblock")
    console.log(node.children)
    console.log("==========#dynamicCodeblock2")
    console.log(node.children[5].children[0].children[0])
    console.log(node.children[4])
    // node.children.push({
    //   type: "paragraph",
    //   children: [
    //     {
    //       type: "text",
    //       value: "hogehoge",
    //     },
    //   ],
    // })
    // findAndReplace(node, /a/, replace)
    console.log("==========#dynamicCodeblock3")
    visit(node, "code", function (node) {
      const variable = node.value.match(/\{(?<content>\S+)\}/)?.groups?.content
      if (variable) {
        console.log(node)
        // const estree = micromark(node.value, {
        //   extensions: [mdxjs()],
        // })
        const estree = parse(node.value)
        node.value = {
          type: "mdxFlowExpression",
          value: variable,
          // TODO: todo
          position: {
            start: {
              line: node.position.start.line + 1,
              column: 1,
              offset: node.position.start.offset + 8,
            },
            end: {
              line: node.position.start.line + 1,
              column: 22,
              offset: node.position.start.offset + 30,
            },
          },
          data: {
            estree,
          },
        }

        console.log(node)
      }
      // if (variable) {
      //   node.value = undefined
      //   node.children = [
      //     {
      //       type: "mdxFlowExpression",
      //       value: variable,
      //       // position: [Object],
      //       // data: [Object]
      //     },
      //   ]
      // }
    })
    return node
  }

  return transformer
}

export default dynamicCodeblock
