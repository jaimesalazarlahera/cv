import ReactMarkdown from 'react-markdown'

interface Job {
  frontmatter: {
    title: string
    company: string
    location: string
    start: string
    end: string
    [key: string]: any
  }
  content: string
}

interface AcademicExperienceProps {
  title: string
  experiences: Job[]
}

function formatDate(date: string) {
  if (!date) return date
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date.slice(0, 7)
  }
  return date
}

export default function AcademicExperience({ title, experiences }: AcademicExperienceProps) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      <div className="space-y-8">
        {experiences.map((job, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-2">
              <div className="flex items-baseline gap-2">
                <h4 className="font-bold text-lg">{job.frontmatter.title}</h4>
              </div>
              <div className="text-gray-500 font-medium text-sm text-right">
                {formatDate(job.frontmatter.end)}
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