import sectionize from "remark-sectionize"
import rehypePrism from "@mapbox/rehype-prism"
import remarkGfm from "remark-gfm"
import { codeHighlight } from "./plugin/code-highlight.mjs"
import { tocExtract } from "./plugin/toc-extract.mjs"

export default {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return process.env.NODE_ENV === "development"
      ? []
      : [
          {
            source: "/:property/_snippet/:any*",
            destination: "/404",
            permanent: true,
          },
        ]
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
      }
    }
    config.module.rules.push({
      test: { and: [/_snippet/, /\.html$/] },
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            rehypePlugins: [rehypePrism, codeHighlight],
            remarkPlugins: [],
            providerImportSource: "@mdx-js/react",
          },
        },
        {
          loader: "./loaders/html-snippet-loader.js",
          ident: "html-snippet-loader",
        },
      ],
    })
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            rehypePlugins: [rehypePrism, codeHighlight, tocExtract],
            remarkPlugins: [sectionize, remarkGfm],
            providerImportSource: "@mdx-js/react",
          },
        },
        {
          loader: "./loaders/mdx-meta-loader.js",

          ident: "mdx-meta-loader",
        },
      ],
    })
    return config
  },
}
