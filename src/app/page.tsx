'use client'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function Home() {
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [htmlPage, setHtmlPage] = useState('')

  return (
    <div className="flex flex-col flex-1 h-full mt-3 mr-3 ml-3 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-row items-stretch gap-10 justify-center w-full h-full flex-1 px-10 text-center">
        <div className="w-full h-[70vh] mb-8">
          <h2 className="mb-10">Markdown code</h2>
          <Textarea
            className="w-full h-full p-4 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200"
            placeholder="Enter your Markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className="w-full h-[70vh]">
          <h2>HTML code</h2>
          <Tabs defaultValue="html-code">
            <TabsList>
              <TabsTrigger value="html-code">HTML code</TabsTrigger>
              <TabsTrigger value="html-page">HTML page</TabsTrigger>
            </TabsList>
            <TabsContent value="html-code">
              <Textarea
                className="w-full h-[70vh] p-4 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200"
                placeholder="Your HTML will appear here..."
                value={html}
                onChange={(e) => setHtml(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="html-page">
              <textarea
                className="w-full h-[70vh] p-4 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200"
                placeholder="Your HTML page will appear here..."
                value={htmlPage}
                onChange={(e) => setHtmlPage(e.target.value)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
