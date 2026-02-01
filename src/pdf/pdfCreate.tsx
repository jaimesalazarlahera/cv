"use client";

import { useEffect } from "react";
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "./vfs_fonts";

import {
    createTitle,
    createIntro,
    createExperiences,
    createOther,
    getDownloadedPDFName
} from "./utils";


interface GenerateCVPdfProps {
    lang: string;
    sum: boolean;
    meta: any;
    intro: any;
    professional: any[];
    academic: any[];
    skills: any[];
    projects: any[];
}

export const generateCVPdf = async ({
    lang,
    sum,
    meta,
    intro,
    professional,
    academic,
    skills,
    projects,
}: GenerateCVPdfProps) => {
    if (pdfMake.vfs) {
        pdfMake.vfs = vfs;
    }

    const content: any[] = [];

    content.push(createTitle(meta?.name || "Jaime Salazar Lahera"));
    if (intro) {
        content.push(
            await createIntro(intro.content, "/images/me.jpg")
        );
    }
    if (professional && professional.length > 0) {
        content.push(
            createExperiences(meta?.titleProf, professional, lang)
        );
    }
    if (academic && academic.length > 0) {
        content.push(
            createExperiences(meta?.titleAcad, academic, lang)
        );
    }
    if (skills && skills.length > 0) {
        content.push(createOther(meta?.titleSkills, skills));
    }
    if (projects && projects.length > 0) {
        content.push(createOther(meta?.titleProjects, projects));
    }

    const docDefinition = {
        pageSize: { width: 645.28, height: 841.89 }, // 50pt wider than A4
        pageMargins: [40, 60, 40, 60],
        content,
        styles: {
            header: { fontSize: 20, bold: true },
            subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        },
        defaultStyle: {
            font: "Inter",
        },
    };

    pdfMake.addFonts({
        Inter: {
            normal: "Inter_18pt-Light.ttf",
            bold: "Inter_18pt-SemiBold.ttf",
            italics: "Inter_18pt-LightItalic.ttf",
        },
        courier: {
            normal: "CourierPrime-Regular.ttf",
        },
    });

    const filename = getDownloadedPDFName(lang, sum);
    pdfMake.createPdf(docDefinition).download(filename);
};

interface PdfExportProps {
    lang: string;
    sum: boolean;
}

export default function PdfExport({ lang, sum }: PdfExportProps) {
    useEffect(() => {
        // Required to load fonts
        if (pdfMake.vfs) {
            pdfMake.vfs = vfs;
        }
    }, []);

    const generatePdf = async () => {
        console.log(`Generating PDF with ${lang} and ${sum}`);

        const response = await fetch(`/api/cv?lang=${lang}&sum=${sum}`);
        const allCVData = await response.json();
        console.log("Got CV data", allCVData);

        const meta = allCVData.meta[0];
        await generateCVPdf({
            lang,
            sum,
            meta,
            intro: allCVData.intro[0],
            professional: allCVData.professional,
            academic: allCVData.academic,
            skills: allCVData.skills,
            projects: allCVData.project,
        });
    };

    return (
        <button
            onClick={generatePdf}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Generate PDF for {`${lang}-${sum}`}
        </button>
    );
}