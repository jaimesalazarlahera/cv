interface IntroProps {
  data: {
    frontmatter: {
      title?: string
      company?: string
      location?: string
      start?: string
      end?: string
      [key: string]: any
    }
    content: string
  } | null
}

export default function Intro({ data }: IntroProps) {
  if (!data) {
    return <div className="mb-12 p-4 border border-dashed text-gray-400 rounded">Intro content not found for this selection.</div>
  }

  const { frontmatter, content } = data

  return (
    <header className="mb-12 border-b pb-8">
      {frontmatter.title && <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>}
      <div className="text-xl text-gray-600 mb-2">
        {frontmatter.company} {frontmatter.location && <span>&middot; {frontmatter.location}</span>}
      </div>
      <div className="text-gray-500 text-sm mb-4">
        {frontmatter.start} &mdash; {frontmatter.end}
      </div>
      <p className="mt-4 text-lg leading-relaxed whitespace-pre-line">{content}</p>
    </header>
  )
}