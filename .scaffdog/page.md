---
name: "page"
root: "src/pages"
output: "**/*"
ignore: []
questions:
  value: "Enter title:"
---

# `{{ inputs.value }}/index.mdx`

```markdown
---
title: { { inputs.value } }
description:
category:
slug: { { inputs.value } }
---

import Demo from "@/components/mdx/components/Demo.tsx"
import Snippet, { Preview, source } from "./\_snippet/index.html"

| value | description |
| :---- | :---------- |
| ``    |             |
| ``    |             |

# Demo

<Demo demo={<Preview />} source={source}>
<Snippet />
</Demo>

# 概要

{/_ ## 注意事項 _/}

# Example

\`\`\`html

\`\`\`

\`\`\`css

\`\`\`

# 関連

- 関連

# 参照

- [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/{{ inputs.value }})
```

# `{{ inputs.value }}/_snippet/index.html`

```html
<div>🚧コードスニペットを準備中です...</div>
```

# `{{ inputs.value }}/_snippet/index.module.css`

```css

```
