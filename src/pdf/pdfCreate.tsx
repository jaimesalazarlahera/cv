"use client";

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
    summ: boolean;
    meta: any;
    intro: any;
    professional: any[];
    academic: any[];
    skills: any[];
    projects: any[];
}

export const generateCVPdf = async ({
    lang,
    summ,
    meta,
    intro,
    professional,
    academic,
    skills,
    projects,
}: GenerateCVPdfProps) => {
    console.log('Generating PDF for ', lang, summ)

    if (pdfMake.vfs) {
        pdfMake.vfs = vfs;
    }

    const content: any[] = [];
    const avatarUrl = `${import.meta.env.BASE_URL}images/me.jpg`;

    content.push(createTitle(meta?.name || "Jaime Salazar Lahera"));
    if (intro) {
        content.push(
            await createIntro(intro.content, avatarUrl)
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

    const filename = getDownloadedPDFName(lang, summ);
    pdfMake.createPdf(docDefinition).download(filename);

    console.log('Generated PDF for ', lang, summ)
};
