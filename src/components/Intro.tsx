import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Skill {
  frontmatter: {
    title: string
    [key: string]: any
  }
  content: string
}

interface IntroProps {
  data: {
    content: string
    [key: string]: any
  } | null
  skills: Skill[]
  metaData: {
    frontmatter: {
      [key: string]: any
    }
    [key: string]: any
  } | null
}

export default function Intro({ data, skills = [], metaData }: IntroProps) {
  if (!data) {
    return <div className="mb-12 p-4 border border-dashed text-gray-400 rounded">Intro content not found for this selection.</div>
  }

  const { content } = data
  const name: string = 'Jaime Salazar Lahera'
  const email = 'jaime.salazar.lahera@gmail.com'
  const linkedin = 'https://www.linkedin.com/in/jaime-salazar-lahera'

  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="flex flex-col items-center mb-24">
      <img src="/images/me.jpg" alt={name} className="w-40 h-40 rounded-full object-cover mb-6 shadow-md" />
      <h1 className="text-4xl font-bold mb-6">{name}</h1>
      <div className="flex gap-6 mb-8 text-sm font-medium text-gray-600">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title={metaData?.frontmatter?.toolTipLinkedIn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <button onClick={copyEmail} className="hover:text-black transition-colors" title={metaData?.frontmatter?.toolTipEmail}>
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="text-lg leading-relaxed text-left">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="text-right">
          {skills.map((skill, i) => (
            <div key={i} className="mb-4">
              <div className="text-gray-700 leading-relaxed [&>ul]:list-none [&>ul>li]:mb-1">
                <ReactMarkdown>{skill.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}