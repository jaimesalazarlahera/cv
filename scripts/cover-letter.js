import fs from "node:fs";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

async function generateCoverLetter(position, company) {
    function createContactInfo() {
        return {
            stack: [
                { text: "Jaime Salazar Lahera" },
                { text: "jaime.salazarlahera@gmail.com" },
                { text: "+34 605 725 691" },
            ],
            alignment: "right",
            marginBottom: 60,
        };
    }

    function createDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return {
            text: `${day}.${month}.${year}`,
            alignment: "right",
            marginBottom: 20,
        };
    }

    function createBody(position, company) {
        const body = [
            { text: "To Whom This May Concern,\n\n" },
            {
                text: `My name is Jaime Salazar, I am a Senior Developer in Madrid and I’m interested in the position of ${position} at ${company}.\n\n`,
            },
            {
                text: "Please feel free to browse ",
            },
            {
                text: "my CV",
                link: "https://jaimesalazarlahera.github.io/cv",
                color: "blue",
                decoration: "underline",
            },
            {
                text:
                    ", featuring several years of experience in backend development, primarily with Azure Functions and Django, as well as within the broader Python ecosystem. In every project I have always advocated for following best practices, maintaining clean code, testing it thoroughly, and delivering it smoothly. I believe I can contribute this to the teams at " +
                    company +
                    ".\n\n",
            },
            {
                text: "In addition, I can demonstrate a native level of English speaking and writing due to my academic trajectory and work experience abroad.\n\n",
            },
            {
                text: `I look forward to a conversation where I can present my qualifications in greater detail, as well as learn more about this position at ${company}.\n\n\nThank you for your consideration,\n\nJaime Salazar Lahera`,
            },
        ];

        return {
            text: body,
        };
    }

    if (pdfFonts?.vfs) {
        pdfMake.vfs = pdfFonts.vfs;
    }

    const content = [];
    content.push(createContactInfo());
    content.push(createDate());
    content.push(createBody(position, company));

    const docDefinition = {
        pageSize: { width: 645.28, height: 841.89 },
        pageMargins: [40, 60, 40, 60],
        content,
        styles: {
            header: { fontSize: 20, bold: true },
            subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        },
        defaultStyle: { font: "Roboto" },
    };

    // Save PDF to disk in Node.js
    const buffer = await pdfMake.createPdf(docDefinition).getBuffer();
    fs.writeFileSync("Cover Letter.pdf", buffer);
    console.log("PDF saved as Cover Letter.pdf");
}

const [, , positionArg, companyArg] = process.argv;
generateCoverLetter(
    positionArg,
    companyArg
).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
