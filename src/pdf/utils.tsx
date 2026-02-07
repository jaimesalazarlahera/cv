export function getDownloadedPDFName(lang: string, sum: boolean) {
    const language = lang === "en" ? "English" : "Español";
    const type = sum ? "Resumé" : "CV";

    return `${type} (${language}) - Jaime Salazar Lahera.pdf`;
}


function parseBold(text: string): (string | { text: string; bold: boolean })[] {
    // splits out **bold** into pdfMake inline objects
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part) =>
        part.startsWith("**") && part.endsWith("**")
            ? { text: part.slice(2, -2), bold: true }
            : part
    ) as any;
}

export function createTitle(text: string) {
    return {
        text,
        style: "header",
        alignment: "center",
        marginBottom: 20,
    };
}

export async function createIntro(text: string, image: string) {
    /**
     * Returns a circular avatar DataURL rendered internally at high resolution.
     *
     * @param {string} url        – source image URL
     * @param {number} displayPx  – final display size in PDF points (e.g. 50)
     * @param {number} scale      – super-sampling factor (e.g. 4 or 5)
     * @returns {Promise<string>}
     */
    async function getCircularAvatarDataURL(url: string, displayPx: number, scale = 4): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const internalSize = displayPx * scale;
                const canvas = document.createElement("canvas");
                canvas.width = internalSize;
                canvas.height = internalSize;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }

                // draw clipped circle
                ctx.beginPath();
                ctx.arc(
                    internalSize / 2,
                    internalSize / 2,
                    internalSize / 2,
                    0,
                    2 * Math.PI
                );
                ctx.closePath();
                ctx.clip();

                // draw full-res image into the high-res circle
                ctx.drawImage(img, 0, 0, internalSize, internalSize);

                // downscale implicitly when PDF embeds at displayPx × displayPx
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    const summary = parseBold(text);
    const avatar = await getCircularAvatarDataURL(image, 50);

    const table = [
        [
            {
                text: summary,
                alignment: "left",
                fontSize: 10,
            },
            [
                {
                    text: "jaime.salazarlahera@gmail.com",
                    alignment: "right",
                    fontSize: 10,
                },
                {
                    text: "github.io/cv",
                    link: "https://jaimesalazarlahera.github.io/cv",
                    color: "blue",
                    alignment: "right",
                    fontSize: 10,
                },
                {
                    text: "in/jaime-salazar-lahera\n",
                    link: "https://www.linkedin.com/in/jaime-salazar-lahera",
                    color: "blue",
                    alignment: "right",
                    fontSize: 10,
                },
                {
                    text: "+34 605 725 691",
                    alignment: "right",
                    fontSize: 10,
                },
            ],
            {
                image: avatar,
                width: 50,
                height: 50,
            },
        ],
    ];

    return {
        table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: table,
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 20],
    };
}

export function createSectionTitle(text: string) {
    return {
        text: text,
        style: "subheader",
        alignment: "center",
        marginTop: 30,
    };
}

export function formatDate(dateStr: string, lang: string) {
    if (!dateStr) return "";
    if (dateStr === "Present")
        return lang === "en" ? "Present" : "presente";

    const monthNamesEN = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const monthNamesES = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "deciembre",
    ];
    const monthNames = lang === "en" ? monthNamesEN : monthNamesES;

    const [year, month] = dateStr.split("-");
    if (!month) return dateStr;
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
}

export function createExperiences(title: string, experiences: any[], lang: string) {
    function createExperience(exp: any, lang: string) {
        const info = exp.frontmatter || exp;
        const body = exp.content !== undefined ? exp.content : (exp.body || "");

        function parseMarkdownToPdfMake(markdown: string) {
            if (!markdown) return { stack: [] };
            const lines = markdown
                .split("\n")
                .map((line) => line.replace(/\t/g, "  "))
                .filter((line) => line.trim().startsWith("-"));

            const root: any[] = [];
            const stack = [{ level: -1, list: root }];

            lines.forEach((rawLine, idx) => {
                const indentMatch = rawLine.match(/^(\s*)-/);
                const indent = indentMatch ? indentMatch[1].length : 0;
                const level = indent / 2;
                const text = rawLine.replace(/^\s*-\s*/, "").trim();
                const formattedText = parseBold(text);

                while (stack[stack.length - 1].level >= level) {
                    stack.pop();
                }

                const currentList = stack[stack.length - 1].list;
                if (level === 0 && currentList.length > 0 && (() => {
                    const nextLine = lines[idx + 1] || "";
                    const nextIndent = nextLine.match(/^(\s*)-/)?.[1].length || 0;
                    const nextLevel = nextIndent / 2;
                    return nextLevel > level;
                })()) {
                    currentList.push({ text: [{ text: "" }] });
                }

                const item = { text: formattedText, children: [] };
                currentList.push(item);

                const nextLine = lines[idx + 1] || "";
                const nextIndent = nextLine.match(/^(\s*)-/)?.[1].length || 0;
                const nextLevel = nextIndent / 2;
                if (nextLevel > level) {
                    stack.push({ level, list: item.children });
                }
            });

            function buildLines(list: any[], level = 0): any[] {
                return list.flatMap((item) => {
                    let leftMargin = 16 * (level + 1);
                    let topMargin = level === 0 ? 4 : 0;
                    const override: any = {};
                    if (level !== 0) override.fontSize = 10;

                    const lineNode = {
                        margin: [leftMargin, topMargin, topMargin, topMargin],
                        text: (item.text || []).map((frag: any) => {
                            if (typeof frag === "string") {
                                return { text: frag, ...override };
                            }
                            return { ...frag, ...override };
                        }),
                    };

                    if (item.children && item.children.length) {
                        return [lineNode, ...buildLines(item.children, level + 1)];
                    } else {
                        return [lineNode];
                    }
                });
            }

            return { stack: buildLines(root) };
        }

        const dates = `${formatDate(info.start, lang)} - ${formatDate(info.end, lang)}`;
        let people = "";
        if (info.people) {
            if (lang === "en") {
                people = info.people === 1 ? `Responsible for ${info.people} person` : `Responsible for ${info.people} people`;
            } else {
                people = info.people === 1 ? `Responsable de ${info.people} persona` : `Responsable de ${info.people} personas`;
            }
        }
        const parsed = parseMarkdownToPdfMake(body);

        const tableBody = [
            [
                [
                    {
                        stack: [
                            {
                                text: [
                                    { text: info.title, style: "subheader" },
                                    { text: "  " },
                                    { text: people, fontSize: 10, color: "gray" },
                                ],
                                marginTop: 20,
                            },
                            {
                                text: [
                                    { text: info.company },
                                    { text: "  " },
                                    { text: info.location, italics: true },
                                ],
                                marginBottom: 5,
                                fontSize: 10,
                            },
                        ],
                    },
                ],
                {
                    text: dates,
                    alignment: "right",
                    fontSize: 10,
                    marginTop: 30,
                },
            ],
            [
                { colSpan: 2, stack: parsed.stack },
                {},
            ],
        ];

        return {
            table: {
                headerRows: 0,
                widths: ["*", "auto"],
                body: tableBody,
            },
            layout: "noBorders",
        };
    }

    const content: any[] = [];
    content.push(createSectionTitle(title));
    experiences.forEach((exp) => {
        content.push(createExperience(exp, lang));
    });
    return content;
}

export function createOther(title: string, items: any[]) {
    function parseInlineAndBold(text: string) {
        const codeParts = text.split(/(`[^`]+`)/g);
        return codeParts.flatMap((part): any => {
            if (part.startsWith("`") && part.endsWith("`")) {
                return [{ text: part.slice(1, -1), font: "courier" }];
            } else {
                return parseBold(part);
            }
        });
    }

    function markdownToPdfMake(md: string) {
        if (!md) return [];
        const lines = md.split("\n");
        const blocks: any[] = [];
        let buffer: string[] = [];
        let listItems: any[] = [];

        function flushBufferAsParagraph() {
            if (buffer.length) {
                blocks.push({
                    text: buffer.map(parseInlineAndBold).flat(),
                    margin: [0, 0, 0, 8],
                });
                buffer = [];
            }
        }

        function flushList() {
            if (listItems.length) {
                blocks.push({ ul: listItems });
                listItems = [];
            }
        }

        for (let line of lines) {
            if (line.trim().startsWith("- ")) {
                flushBufferAsParagraph();
                listItems.push({
                    text: parseInlineAndBold(line.replace(/^\s*-\s*/, "")),
                });
            } else if (line.trim() === "") {
                flushBufferAsParagraph();
                flushList();
            } else {
                flushList();
                buffer.push(line);
            }
        }
        flushBufferAsParagraph();
        flushList();

        return blocks;
    }

    const content: any[] = [];
    content.push(createSectionTitle(title));
    items.forEach((item) => {
        const info = item.frontmatter || item;
        const body = item.content !== undefined ? item.content : (item.body || "");
        content.push({ text: info.title, style: "subheader" });
        content.push(markdownToPdfMake(body));
    });
    return content;
}