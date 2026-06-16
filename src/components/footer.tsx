export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/50">
      <div className="flex h-8 items-center justify-center px-4">
        <p className="text-[11px] text-muted-foreground/60">
          md → html &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
