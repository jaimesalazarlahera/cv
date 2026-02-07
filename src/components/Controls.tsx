import { generateCVPdf } from '../pdf/pdfCreate'
import { getDownloadedPDFName } from '../pdf/utils'

function downloadCVPdf(lang: string, summ: boolean) {
    console.log('Downloading PDF for ', lang, summ)
    const filename = getDownloadedPDFName(lang, summ)
    const link = document.createElement('a')
    link.href = `/cvs/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log('Downloaded PDF for ', lang, summ)
}

interface ControlsProps {
    lang: 'en' | 'es'
    setLang: (lang: 'en' | 'es') => void
    summ: boolean
    setSumm: (summ: boolean) => void
    cvDownloadText?: string
    meta: any
    intro: any
    experiences: any[]
    academicExperiences: any[]
    skills: any[]
    projects: any[]
}

export default function Controls({
    lang,
    setLang,
    summ,
    setSumm,
    cvDownloadText,
    meta,
    intro,
    experiences,
    academicExperiences,
    skills,
    projects,
}: ControlsProps) {
    const generatePdf = async () => {
        if (import.meta.env.DEV) {
            await generateCVPdf({
                lang,
                summ,
                meta,
                intro,
                professional: experiences,
                academic: academicExperiences,
                skills,
                projects,
            })
        } else {
            await downloadCVPdf(lang, summ)
        }
    }

    return (
        <div className="flex justify-end gap-4 mb-8 text-sm print:hidden">
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
            <div className="flex bg-gray-100 rounded p-1">
                <button
                    onClick={() => setSumm(false)}
                    className={`px-3 py-1 rounded ${!summ ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
                >
                    CV
                </button>
                <button
                    onClick={() => setSumm(true)}
                    className={`px-3 py-1 rounded ${summ ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
                >
                    RESUME
                </button>
            </div>
            <button
                onClick={generatePdf}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
                title={cvDownloadText}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                PDF
            </button>
        </div>
    )
}