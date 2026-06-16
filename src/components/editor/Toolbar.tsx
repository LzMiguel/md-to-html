'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DownloadSimple,
  CopySimple,
  Trash,
  FileHtml,
} from '@phosphor-icons/react'
import { downloadHtml, copyToClipboard } from '@/lib/utils'
import { wrapInHtmlDocument } from '@/lib/parser'
import { toast } from 'sonner'

interface ToolbarProps {
  html: string
  markdown: string
  onClear: () => void
}

export function Toolbar({ html, markdown, onClear }: ToolbarProps) {
  const hasContent = markdown.length > 0

  const handleDownload = () => {
    if (!hasContent) return
    const fullPage = wrapInHtmlDocument(html)
    downloadHtml(fullPage, 'index.html')
    toast.success('Download iniciado', {
      description: 'O arquivo index.html foi gerado.',
    })
  }

  const handleCopyHtml = async () => {
    if (!hasContent) return
    const success = await copyToClipboard(html)
    if (success) {
      toast.success('Copiado!', {
        description: 'HTML copiado para a área de transferência.',
      })
    } else {
      toast.error('Erro ao copiar', {
        description: 'Não foi possível copiar o HTML.',
      })
    }
  }

  const handleCopyFullPage = async () => {
    if (!hasContent) return
    const fullPage = wrapInHtmlDocument(html)
    const success = await copyToClipboard(fullPage)
    if (success) {
      toast.success('Copiado!', {
        description: 'Página HTML completa copiada.',
      })
    } else {
      toast.error('Erro ao copiar', {
        description: 'Não foi possível copiar o HTML.',
      })
    }
  }

  const handleClear = () => {
    onClear()
    toast('Editor limpo')
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopyHtml}
            disabled={!hasContent}
            aria-label="Copiar HTML"
          >
            <CopySimple className="size-4" weight="bold" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copiar HTML</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopyFullPage}
            disabled={!hasContent}
            aria-label="Copiar página completa"
          >
            <FileHtml className="size-4" weight="bold" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copiar página HTML completa</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDownload}
            disabled={!hasContent}
            aria-label="Baixar HTML"
          >
            <DownloadSimple className="size-4" weight="bold" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Baixar index.html</TooltipContent>
      </Tooltip>

      <div className="w-px h-4 bg-border/50 mx-0.5" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            disabled={!hasContent}
            aria-label="Limpar editor"
          >
            <Trash className="size-4" weight="bold" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Limpar editor</TooltipContent>
      </Tooltip>
    </div>
  )
}
