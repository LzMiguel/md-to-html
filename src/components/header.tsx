import { ThemeToggle } from '@/components/theme-toggle'
import { CodeBlock } from '@phosphor-icons/react/dist/ssr'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <CodeBlock className="size-5 text-foreground" weight="duotone" />
          <h1 className="text-sm font-semibold tracking-tight text-foreground">
            md → html
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
