import ReactMarkdown from 'react-markdown'

interface Job {
  frontmatter: {
    title: string
    company: string
    location: string
    start: string
    end: string
    people?: number
    [key: string]: any
  }
  content: string
}

interface ProfessionalExperienceProps {
  title: string
  experiences: Job[]
}

export default function ProfessionalExperience({ title, experiences }: ProfessionalExperienceProps) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      <div className="space-y-8">
        {experiences.map((job, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-2">
              <div className="flex items-baseline gap-2">
                <h4 className="font-bold text-lg">{job.frontmatter.title}</h4>
                {job.frontmatter.people ? <span className="text-sm text-gray-600">({job.frontmatter.people} people)</span> : null}
              </div>
              <div className="text-gray-500 font-medium text-sm text-right">
                {job.frontmatter.start} &mdash; {job.frontmatter.end}
              </div>
            </div>
            <div className="text-gray-700 italic mb-4">{job.frontmatter.company} &middot; {job.frontmatter.location}</div>
            <div className="text-gray-700 leading-relaxed [&>ul]:list-none [&>ul]:pl-4 [&_ul_ul]:list-disc [&_ul_ul]:pl-6 [&_ul_ul_ul]:list-[circle] [&>ul:has(ul)>li:not(:last-child)]:mb-4">
              <ReactMarkdown>{job.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}