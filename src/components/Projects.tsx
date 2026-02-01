import ReactMarkdown from 'react-markdown'

interface Project {
  frontmatter: {
    title: string
    url?: string
    [key: string]: any
  }
  content: string
}

interface ProjectsProps {
  title: string
  projects: Project[]
}

function formatDate(date: string) {
  if (!date) return date
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date.slice(0, 7)
  }
  return date
}

export default function Projects({ title, projects }: ProjectsProps) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      <div className="space-y-8">
        {projects.map((project, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="font-bold text-lg">
                {project.frontmatter.url ? (
                  <a href={project.frontmatter.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                    {project.frontmatter.title}
                  </a>
                ) : (
                  project.frontmatter.title
                )}
              </h4>
              {(project.frontmatter.start || project.frontmatter.end) && (
                <div className="text-gray-500 font-medium text-sm text-right">
                  {formatDate(project.frontmatter.start)} {project.frontmatter.end ? `— ${formatDate(project.frontmatter.end)}` : ''}
                </div>
              )}
            </div>
            <div className="text-gray-700 leading-relaxed [&>ul]:list-none [&>ul]:pl-4 [&_ul_ul]:list-disc [&_ul_ul]:pl-6 [&_ul_ul_ul]:list-[circle] [&>ul:has(ul)>li:not(:last-child)]:mb-4">
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}