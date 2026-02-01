// import ReactMarkdown from 'react-markdown'

// interface Skill {
//   frontmatter: {
//     title: string
//     [key: string]: any
//   }
//   content: string
// }

// interface SkillsProps {
//   title: string
//   skills: Skill[]
// }

// export default function Skills({ title, skills }: SkillsProps) {
//   return (
//     <section className="mb-12">
//       <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {skills.map((skill, i) => (
//           <div key={i}>
//             <h4 className="font-bold text-lg mb-2 border-b pb-1">{skill.frontmatter.title}</h4>
//             <div className="text-gray-700 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1">
//               <ReactMarkdown>{skill.content}</ReactMarkdown>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }