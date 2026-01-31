import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CVData } from '../types/cv'
import { getCVContent } from '../server/cv'
import Intro from '../components/Intro'
import ProfessionalExperience from '../components/ProfessionalExperience'


export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const content = await getCVContent()
    return { content }
  },
})

function Home() {
  const data = Route.useLoaderData()
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [summ, setSumm] = useState<boolean>(false)

  // Construct the key to look up in the loaded content
  // e.g., "intro-en" or "intro-en-sum"
  const suffix = `-${lang}${summ ? '-sum' : ''}`
  const introKey = `intro${suffix}`
  const introData = data.content?.intro?.[introKey]
  const metaKey = `meta${suffix}`
  const metaData = data.content?.meta?.[metaKey]

  const professionalContent = data.content?.professional || {}
  const experiences = Object.keys(professionalContent)
    .filter((key) => key.endsWith(suffix))
    .map((key) => professionalContent[key])
    .sort((a, b) => new Date(b.frontmatter.start).getTime() - new Date(a.frontmatter.start).getTime())

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

      <ProfessionalExperience title={metaData?.frontmatter?.titleProf} experiences={experiences} />

      {/* <section>
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
      </section> */}
    </div>
  )
}
