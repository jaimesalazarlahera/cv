import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CVData } from '../types/cv'
import { getCVContent } from '../server/cv'
import Intro from '../components/Intro'

// Mock Data - In the future, move this to a loader
const cvData: CVData = {
  name: "Alex Developer",
  title: "Senior Full Stack Engineer",
  summary: "Building scalable web applications with the TanStack ecosystem.",
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      role: "Senior Engineer",
      period: "2021 - Present",
      description: "Leading the frontend migration to React and TypeScript."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "TanStack Portfolio",
      techStack: ["React", "TanStack Start", "Tailwind"],
      url: "https://github.com/example/repo"
    }
  ]
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const content = await getCVContent()
    return { ...cvData, content }
  },
})

function Home() {
  const data = Route.useLoaderData()
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [summ, setSumm] = useState<boolean>(false)

  // Construct the key to look up in the loaded content
  // e.g., "intro-en" or "intro-en-sum"
  const introKey = `intro-${lang}${summ ? '-sum' : ''}`
  const introData = data.content?.intro?.[introKey]

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="flex justify-end gap-4 mb-8 text-sm">
        <div className="flex bg-gray-100 rounded p-1">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('es')}
            className={`px-3 py-1 rounded ${lang === 'es' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
          >
            ES
          </button>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
          <input type="checkbox" checked={summ} onChange={(e) => setSumm(e.target.checked)} /> Summarized
        </label>
      </div>

      <Intro data={introData} />

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Experience</h3>
        <div className="space-y-8">
          {data.experience.map((job) => (
            <div key={job.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-gray-500 font-medium">{job.period}</div>
              <div className="md:col-span-3">
                <h4 className="font-bold text-lg">{job.company}</h4>
                <div className="text-gray-700 italic mb-2">{job.role}</div>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-6">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-lg mb-2">{project.title}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <a href={project.url} className="text-blue-600 hover:underline">
                  View Project &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
