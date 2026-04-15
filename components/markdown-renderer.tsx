type Props = {
  html: string
}

export function MarkdownRenderer({ html }: Props) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-p:leading-[1.85] prose-p:text-[16px]
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-4
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-2
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
        prose-strong:text-foreground
        prose-blockquote:border-l-2 prose-blockquote:border-primary/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:font-normal
        prose-code:before:content-none prose-code:after:content-none
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.85em] prose-code:font-mono prose-code:font-normal
        prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-6
        prose-img:rounded-lg prose-img:border prose-img:border-border
        prose-hr:border-border/60
        [&_pre]:!bg-[#0d1117] [&_pre]:border [&_pre]:border-border/60 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[13px] [&_pre]:leading-relaxed
        [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-[inherit]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
