'use client'

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Browser, Code } from '@phosphor-icons/react'

interface HtmlPreviewProps {
  html: string
  rawHtml: string
}

export function HtmlPreview({ html, rawHtml }: HtmlPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="preview" className="flex flex-col h-full">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
          <TabsList className="h-7">
            <TabsTrigger value="preview" className="gap-1 text-[11px] px-2">
              <Browser className="size-3.5" weight="duotone" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1 text-[11px] px-2">
              <Code className="size-3.5" weight="duotone" />
              HTML
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="flex-1 min-h-0 mt-0">
          <ScrollArea className="h-full">
            <div
              className="markdown-preview px-5 py-4"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="code" className="flex-1 min-h-0 mt-0">
          <ScrollArea className="h-full">
            <pre className="px-4 py-3 text-[13px] leading-relaxed font-mono text-foreground/90 whitespace-pre-wrap break-words">
              <code>{rawHtml}</code>
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
