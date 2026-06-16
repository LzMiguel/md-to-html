'use client'

import { useState, useCallback, useMemo } from 'react'
import { MarkdownInput } from '@/components/editor/MarkdownInput'
import { HtmlPreview } from '@/components/editor/HtmlPreview'
import { Toolbar } from '@/components/editor/Toolbar'
import { parseMarkdown } from '@/lib/parser'
import { debounce } from '@/lib/utils'

const SAMPLE_MARKDOWN = `# Markdown to HTML Converter

Comece digitando **Markdown** à esquerda e veja o resultado à direita em tempo real.

## Funcionalidades

- [x] Conversão em tempo real
- [x] Drag & Drop de arquivos
- [ ] Syntax highlighting
- [x] Download como HTML

## Exemplo de Código

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Tabela

| Feature | Status |
|---------|--------|
| Parser  | ✅     |
| Preview | ✅     |
| Export  | ✅     |

> **Dica:** Arraste um arquivo \`.md\` para a área de edição para carregar seu conteúdo.

::: toggle Seção Collapsible
Este conteúdo fica escondido até o usuário expandir.

Pode conter **qualquer Markdown** dentro!
:::

---

Feito com ❤️ usando [[markdown-it|https://github.com/markdown-it/markdown-it]]
`

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN)
  const [html, setHtml] = useState(() => parseMarkdown(SAMPLE_MARKDOWN))

  const debouncedParse = useMemo(
    () =>
      debounce((text: string) => {
        setHtml(parseMarkdown(text))
      }, 150),
    []
  )

  const handleMarkdownChange = useCallback(
    (value: string) => {
      setMarkdown(value)
      debouncedParse(value)
    },
    [debouncedParse]
  )

  const handleClear = useCallback(() => {
    setMarkdown('')
    setHtml('')
  }, [])

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-end px-4 py-1.5 border-b border-border/30 bg-muted/20">
        <Toolbar html={html} markdown={markdown} onClear={handleClear} />
      </div>

      {/* Split screen editor */}
      <main className="flex flex-1 min-h-0">
        {/* Left panel — Markdown input */}
        <div className="flex-1 min-w-0 border-r border-border/30">
          <MarkdownInput value={markdown} onChange={handleMarkdownChange} />
        </div>

        {/* Right panel — HTML output */}
        <div className="flex-1 min-w-0">
          <HtmlPreview html={html} rawHtml={html} />
        </div>
      </main>
    </div>
  )
}
