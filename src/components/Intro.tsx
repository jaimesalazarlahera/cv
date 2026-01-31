import ReactMarkdown from 'react-markdown'

interface IntroProps {
  data: {
    content: string
    [key: string]: any
  } | null
}

export default function Intro({ data }: IntroProps) {
  if (!data) {
    return <div className="mb-12 p-4 border border-dashed text-gray-400 rounded">Intro content not found for this selection.</div>
  }

  const { content } = data
  const name: string = 'Jaime Salazar Lahera'

  return (
    <header className="flex flex-col items-center mb-12">
      <img src="/images/me.jpg" alt={name} className="w-40 h-40 rounded-full object-cover mb-6 shadow-md" />
      <h1 className="text-4xl font-bold mb-6">{name}</h1>
      <div className="text-lg leading-relaxed text-center max-w-2xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </header>
  )
}