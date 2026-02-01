import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CVData } from '../types/cv'
import { getCVContent } from '../server/cv'
import Intro from '../components/Intro'
import ProfessionalExperience from '../components/ProfessionalExperience'
import AcademicExperience from '../components/AcademicExperience'
import Projects from '../components/Projects'


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

  const academicContent = data.content?.academic || {}
  const academicExperiences = Object.keys(academicContent)
    .filter((key) => key.endsWith(suffix))
    .map((key) => academicContent[key])
    .sort((a, b) => new Date(b.frontmatter.start).getTime() - new Date(a.frontmatter.start).getTime())

  const skillsContent = data.content?.skills || {}
  const skills = Object.keys(skillsContent)
    .filter((key) => key.endsWith(suffix))
    .map((key) => skillsContent[key])
    .sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0))

  const projectsContent = data.content?.projects || data.content?.project || {}
  const projects = Object.keys(projectsContent)
    .filter((key) => key.endsWith(suffix))
    .map((key) => projectsContent[key])
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.end || a.frontmatter.start || 0).getTime()
      const dateB = new Date(b.frontmatter.end || b.frontmatter.start || 0).getTime()
      return dateB - dateA
    })

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

      <Intro data={introData} skills={skills} metaData={metaData} />

      {experiences.length > 0 && (
        <ProfessionalExperience title={metaData?.frontmatter?.titleProf} experiences={experiences} />
      )}

      {academicExperiences.length > 0 && (
        <AcademicExperience title={metaData?.frontmatter?.titleAcad} experiences={academicExperiences} />
      )}

      {projects.length > 0 && (
        <Projects title={metaData?.frontmatter?.titleProjects} projects={projects} />
      )}

    </div>
  )
}
