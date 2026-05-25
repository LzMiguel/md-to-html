export default function Footer() {
  return (
    <footer className="w-full h-16 flex items-center justify-center border-t mt-8">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Markdown to HTML Converter. All rights
        reserved.
      </p>
    </footer>
  )
}
