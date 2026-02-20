import { generateCVPdf } from '../pdf/pdfCreate'
import { getDownloadedPDFName } from '../pdf/utils'

function downloadCVPdf(lang: string, summ: boolean) {
    console.log('Downloading PDF for ', lang, summ)
    const filename = getDownloadedPDFName(lang, summ)
    const link = document.createElement('a')
    link.href = `${import.meta.env.BASE_URL}/cvs/${filename}`
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
    const moreDetailsText = meta?.['buttonSum-true'] ?? 'More details'
    const fewerDetailsText = meta?.['buttonSum-false'] ?? 'Fewer details'
    const enFlagBackground =
        'linear-gradient(90deg, transparent 45%, #c8102e 45%, #c8102e 55%, transparent 55%), linear-gradient(0deg, transparent 45%, #c8102e 45%, #c8102e 55%, transparent 55%), linear-gradient(90deg, transparent 42%, #ffffff 42%, #ffffff 58%, transparent 58%), linear-gradient(0deg, transparent 42%, #ffffff 42%, #ffffff 58%, transparent 58%), linear-gradient(33deg, transparent 43%, #c8102e 43%, #c8102e 50%, transparent 50%), linear-gradient(-33deg, transparent 43%, #c8102e 43%, #c8102e 50%, transparent 50%), linear-gradient(33deg, transparent 41%, #ffffff 41%, #ffffff 52%, transparent 52%), linear-gradient(-33deg, transparent 41%, #ffffff 41%, #ffffff 52%, transparent 52%), #012169'
    const esFlagBackground = 'linear-gradient(to bottom, #aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75% 100%)'

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
        <div className="fixed top-6 right-6 z-50 flex justify-end gap-6 text-sm print:hidden">
            <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                <button
                    onClick={() => setLang('en')}
                    className={`w-12 h-7 rounded transition-all ${lang === 'en' ? 'ring-2 ring-white shadow-sm' : 'opacity-70'}`}
                    style={{ background: enFlagBackground }}
                    title="English"
                    aria-label="English"
                >
                    <span className="sr-only">English</span>
                </button>
                <button
                    onClick={() => setLang('es')}
                    className={`w-12 h-7 rounded transition-all ${lang === 'es' ? 'ring-2 ring-white shadow-sm' : 'opacity-70'}`}
                    style={{ backgroundImage: esFlagBackground, backgroundSize: 'cover' }}
                    title="Español"
                    aria-label="Español"
                >
                    <span className="sr-only">Español</span>
                </button>
            </div>
            <div className="flex bg-gray-100 rounded p-0">
                <button
                    onClick={() => setSumm(false)}
                    className={`h-9 px-4 rounded ${!summ ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
                    title={moreDetailsText}
                    aria-label={moreDetailsText}
                >
                    +
                </button>
                <button
                    onClick={() => setSumm(true)}
                    className={`h-9 px-4 rounded ${summ ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
                    title={fewerDetailsText}
                    aria-label={fewerDetailsText}
                >
                    -
                </button>
            </div>
            <button
                onClick={generatePdf}
                className="h-9 px-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-1.5"
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
