'use client'

import { useCallback, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UploadSimple, File } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface MarkdownInputProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownInput({ value, onChange }: MarkdownInputProps) {
  const [isDragging, setIsDragging] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dragCounterRef = useRef(0)

  const handleFile = useCallback(
    (file: globalThis.File) => {
      const validTypes = ['text/markdown', 'text/plain', 'text/x-markdown']
      const validExtensions = ['.md', '.txt', '.markdown']
      const hasValidType = validTypes.includes(file.type)
      const hasValidExtension = validExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )

      if (!hasValidType && !hasValidExtension) {
        toast.error('Formato inválido', {
          description: 'Apenas arquivos .md e .txt são aceitos.',
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        onChange(text)
        toast.success('Arquivo carregado', {
          description: `${file.name} foi carregado com sucesso.`,
        })
      }
      reader.onerror = () => {
        toast.error('Erro ao ler arquivo', {
          description: 'Não foi possível ler o conteúdo do arquivo.',
        })
      }
      reader.readAsText(file)
    },
    [onChange]
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounterRef.current = 0
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile]
  )

  const lineCount = value.split('\n').length
  const charCount = value.length

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Markdown
        </span>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70">
          <span>{lineCount} linhas</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      <div
        className="relative flex-1 min-h-0"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Drop zone overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/5 backdrop-blur-[2px] border-2 border-dashed border-primary/40 transition-all">
            <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
              <UploadSimple className="size-8 text-primary/60" weight="duotone" />
              <span className="text-sm font-medium text-primary/80">
                Solte o arquivo aqui
              </span>
              <span className="text-xs text-muted-foreground">
                .md ou .txt
              </span>
            </div>
          </div>
        )}

        <ScrollArea className="h-full">
          <textarea
            ref={textareaRef}
            id="markdown-input"
            className="w-full h-full min-h-[calc(100vh-14rem)] resize-none border-0 bg-transparent px-4 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono"
            placeholder="# Comece escrevendo Markdown aqui...&#10;&#10;Ou arraste um arquivo .md para esta área."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
        </ScrollArea>

        {/* Empty state / drop hint */}
        {!value && !isDragging && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground/50 bg-muted/30 rounded-full">
              <File className="size-3.5" />
              <span>Arraste um arquivo .md ou .txt aqui</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
