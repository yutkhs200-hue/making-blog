type Props = {
  html: string
}

export function MarkdownRenderer({ html }: Props) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-semibold
        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
        prose-code:before:content-none prose-code:after:content-none
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-transparent prose-pre:p-0
        [&_pre]:!bg-[#24292e] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
