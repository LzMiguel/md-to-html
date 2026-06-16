import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import multimdTable from 'markdown-it-multimd-table'
import container from 'markdown-it-container'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

// Register plugins
md.use(taskLists, { enabled: true, label: true })
md.use(multimdTable, {
  multiline: true,
  rowspan: true,
  headerless: true,
})

// Configure container plugin for Notion-style toggles
// Syntax: ::: toggle Title
// Content...
// :::
// Converts to: <details><summary>Title</summary>Content...</details>
md.use(container, 'toggle', {
  validate: function (params: string) {
    return params.trim().match(/^toggle\s+(.*)$/)
  },
  render: function (tokens: any[], idx: number) {
    const m = tokens[idx].info.trim().match(/^toggle\s+(.*)$/)
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details>\n<summary>' + md.utils.escapeHtml(m![1]) + '</summary>\n'
    } else {
      // closing tag
      return '</details>\n'
    }
  },
})

// Custom wikilinks plugin (inline rule)
// Converts [[Link]] to <a href="Link">Link</a>
// Converts [[Link|Display Text]] to <a href="Link">Display Text</a>
function wikilinksPlugin(md: MarkdownIt) {
  md.inline.ruler.after('emphasis', 'wikilink', (state, silent) => {
    const src = state.src
    const pos = state.pos

    // Must start with [[
    if (src.charCodeAt(pos) !== 0x5B || src.charCodeAt(pos + 1) !== 0x5B) {
      return false
    }

    // Find closing ]]
    const closePos = src.indexOf(']]', pos + 2)
    if (closePos === -1) {
      return false
    }

    if (!silent) {
      const content = src.slice(pos + 2, closePos)
      const parts = content.split('|')
      const href = parts[0].trim()
      const label = parts.length > 1 ? parts[1].trim() : href

      const tokenOpen = state.push('html_inline', '', 0)
      tokenOpen.content = `<a href="${md.utils.escapeHtml(href)}" class="wikilink">`

      const tokenText = state.push('html_inline', '', 0)
      tokenText.content = md.utils.escapeHtml(label)

      const tokenClose = state.push('html_inline', '', 0)
      tokenClose.content = '</a>'
    }

    state.pos = closePos + 2
    return true
  })
}

md.use(wikilinksPlugin)

export function parseMarkdown(input: string): string {
  return md.render(input)
}

export function wrapInHtmlDocument(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a1a;
    }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    pre { background: #f6f8fa; padding: 1em; border-radius: 6px; overflow-x: auto; }
    code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding: 0.5em 1em; color: #666; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f6f8fa; font-weight: 600; }
    img { max-width: 100%; }
    details { margin: 1em 0; padding: 0.5em; border: 1px solid #eee; border-radius: 4px; }
    summary { cursor: pointer; font-weight: 600; }
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .task-list-item { list-style: none; }
    .task-list-item input { margin-right: 0.5em; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`
}
