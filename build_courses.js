import fs from 'fs';
import path from 'path';
import katex from 'katex';

const LECTURES_DIR = 'src/lib/source/lectures';
const WORKSHEETS_DIR = 'src/lib/source/worksheets';
const OUTPUT_FILE = 'src/lib/courses.ts';

const GRAPHICS_SRC = 'src/lib/source/graphics';
const GRAPHICS_DEST = 'static/graphics';
if (fs.existsSync(GRAPHICS_SRC)) {
    if (!fs.existsSync(GRAPHICS_DEST)) fs.mkdirSync(GRAPHICS_DEST, { recursive: true });
    fs.readdirSync(GRAPHICS_SRC).forEach(file => {
        fs.copyFileSync(path.join(GRAPHICS_SRC, file), path.join(GRAPHICS_DEST, file));
    });
}

const macros = {
    "\\bv": "\\langle #1 \\rangle",
    "\\bvec": "\\mathbf{#1}",
    "\\pa": "",
    "\\vv": "#1\\mathbf{i} #2\\mathbf{j}",
    "\\vvv": "#1\\mathbf{i} #2\\mathbf{j} #3\\mathbf{k}",
    "\\red": "\\textcolor{red}{#1}",
    "\\blue": "\\textcolor{blue}{#1}"
};

function renderMath(text) {
    // Preserve tikzpicture blocks first
    const tikzBlocks = [];
    text = text.replace(/\\begin\{tikzpicture\}(?:\[.*?\])?([\s\S]*?)\\end\{tikzpicture\}/g, (m, p1) => {
        tikzBlocks.push(p1);
        return '%%TIKZ_BLOCK_' + (tikzBlocks.length - 1) + '%%';
    });

    // Remove figure environment wrappers
    text = text.replace(/\\begin\{figure\}(?:\[.*?\])?([\s\S]*?)\\end\{figure\}/g, (m, p1) => {
        return '<div class="my-4">' + p1.trim() + '</div>';
    });

    // Replace environments
    text = text.replace(/\\begin\{defn\}\{(.*?)\}\{(.*?)\}([\s\S]*?)\\end\{defn\}/g,
        '<div class="bg-blue-50 p-4 rounded-lg my-4 border border-blue-200"><strong>Definition $1: $2</strong>$3</div>');
    text = text.replace(/\\begin\{prop\}\{(.*?)\}\{(.*?)\}([\s\S]*?)\\end\{prop\}/g,
        '<div class="bg-purple-50 p-4 rounded-lg my-4 border border-purple-200"><strong>Property $1: $2</strong>$3</div>');
    text = text.replace(/\\begin\{ex\}(?:\{(.*?)\})?([\s\S]*?)\\end\{ex\}/g,
        '<div class="bg-green-50 p-4 rounded-lg my-4 border border-green-200"><strong>Example $1</strong>$2</div>');
    text = text.replace(/\\begin\{sol\}([\s\S]*?)\\end\{sol\}/g,
        '<details class="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200"><summary class="font-bold cursor-pointer text-indigo-700">Solution</summary><div class="mt-4">$1</div></details>');
    text = text.replace(/\\begin\{thm\}(?:\{(.*?)\})?(?:\{(.*?)\})?([\s\S]*?)\\end\{thm\}/g, (m, p1, p2, p3) => {
        let title = "";
        if (p1 && p1.trim() !== '') {
            title = ` ${p1}`;
        }
        if (p2 && p2.trim() !== '') {
            title += `: ${p2}`;
        }
        return `<div class="bg-yellow-50 p-4 rounded-lg my-4 border border-yellow-200"><strong>Theorem${title}</strong>${p3}</div>`;
    });
    text = text.replace(/\\begin\{block\}(?:\{(.*?)\})?([\s\S]*?)\\end\{block\}/g, (m, p1, p2) => {
        let title = p1 && p1.trim() !== '' ? `<strong>${p1}</strong><br/>` : '';
        return `<div class="bg-gray-100 p-4 rounded-lg my-4 border border-gray-300">${title}${p2}</div>`;
    });

    // block math
    text = text.replace(/\\begin\{eq\}([\s\S]*?)\\end\{eq\}/g, '\\begin{equation}$1\\end{equation}');
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, (m, p1) => {
        try { return katex.renderToString(p1, {displayMode: true, throwOnError: false, macros}); }
        catch (e) { return `<div>Error</div>`; }
    });
    text = text.replace(/\\begin\{equation\}([\s\S]*?)\\end\{equation\}/g, (m, p1) => {
        try { return katex.renderToString(p1, {displayMode: true, throwOnError: false, macros}); }
        catch (e) { return `<div>Error</div>`; }
    });
    text = text.replace(/\\begin\{eq\*\}([\s\S]*?)\\end\{eq\*\}/g, (m, p1) => {
        try { return katex.renderToString("\\begin{aligned}" + p1 + "\\end{aligned}", {displayMode: true, throwOnError: false, macros}); }
        catch (e) { return `<div>Error</div>`; }
    });
    // inline math
    text = text.replace(/\$([^$]+?)\$/g, (m, p1) => {
        try { return katex.renderToString(p1, {throwOnError: false, macros}); }
        catch (e) { return `<span>Error</span>`; }
    });

    // Clean up syntaxes
    text = text.replace(/%+.*$/gm, '');
    text = text.replace(/\\centering/g, '');
    text = text.replace(/\\label\{.*?\}/g, '');
    text = text.replace(/\\vspace\*?\{.*?\}/g, '');

    // Custom replacements for slide and href
    text = text.replace(/\\begin\{slide\}/g, '');
    text = text.replace(/\\end\{slide\}/g, '');
    text = text.replace(/\\href\{(.*?)\}\{(.*?)\}/g, '<a href="$1" target="_blank" class="text-indigo-600 underline">$2</a>');

    // lists
    text = text.replace(/\\begin\{itemize\}/g, '<ul class="list-disc pl-5 space-y-1 my-2">');
    text = text.replace(/\\end\{itemize\}/g, '</ul>');
    text = text.replace(/\\begin\{enumerate\}/g, '<ol class="list-decimal pl-5 space-y-1 my-2">');
    text = text.replace(/\\end\{enumerate\}/g, '</ol>');
    text = text.replace(/\\item/g, '<li>');
    // tasks to list
    text = text.replace(/\\begin\{tasks\}(?:\(.*?\))?([\s\S]*?)\\end\{tasks\}/g, '<ul class="list-none pl-5 space-y-1 my-2">$1</ul>');
    text = text.replace(/\\task/g, '<li>');

    // Other formatting
    text = text.replace(/\\alert\{(.*?)\}/g, '<strong>$1</strong>');
    text = text.replace(/\\textbf\{(.*?)\}/g, '<strong>$1</strong>');

    // Remove frame environments
    text = text.replace(/\\begin\{frame\}(?:\[.*?\])?(?:\{(.*?)\})?/g, (m, p1) => {
        return p1 ? `<h1 class="text-2xl font-extrabold mt-6 mb-4 text-indigo-900">${p1}</h1>` : '';
    });
    text = text.replace(/\\end\{frame\}/g, '');
    text = text.replace(/\\frametitle\{(.*?)\}/g, '<h1 class="text-2xl font-extrabold mt-6 mb-4 text-indigo-900">$1</h1>');
    text = text.replace(/\\frame\{(.*?)\}/g, (m, p1) => {
        if (p1 === '\\titlepage' || p1 === 'titlepage' || p1 === '\\sectionpage' || p1 === 'sectionpage') return '';
        return `<h1 class="text-2xl font-extrabold mt-6 mb-4 text-indigo-900">${p1}</h1>`;
    });

    text = text.replace(/\\tableofcontents/g, '');
    text = text.replace(/\\sectionpage/g, '');

    text = text.replace(/\\addfig(?:\[.*?\])?(?:\{.*?\})?\{(.*?)\}\{(.*?)\}\{.*?\}/g, (m, img, alt) => {
        const ext = img.match(/\.[a-zA-Z0-9]+$/) ? '' : '.png';
        const basename = img.split('/').pop();
        return `<img src="/graphics/${basename}${ext}" alt="${alt}" class="my-6 mx-auto max-w-full rounded shadow" />`;
    });
    text = text.replace(/\\includegraphics(?:\[.*?\])?\{(.*?)\}/g, (m, img) => {
        const ext = img.match(/\.[a-zA-Z0-9]+$/) ? '' : '.png';
        const basename = img.split('/').pop();
        return `<img src="/graphics/${basename}${ext}" alt="Image" class="my-6 mx-auto max-w-full rounded shadow" />`;
    });

    // line breaks
    text = text.replace(/\\\\/g, '<br/>');

    // Remove \pa
    text = text.replace(/\\pa/g, '');

    // Restore tikz blocks
    text = text.replace(/%%TIKZ_BLOCK_(\d+)%%/g, (m, p1) => {
        return `<script type="text/tikz">\n\\begin{tikzpicture}\n${tikzBlocks[parseInt(p1)]}\n\\end{tikzpicture}\n</script>`;
    });

    return text.trim();
}

let solutionsMap = {};
if (fs.existsSync('src/lib/worksheet_solutions.json')) {
    solutionsMap = JSON.parse(fs.readFileSync('src/lib/worksheet_solutions.json', 'utf-8'));
}

function parseWorksheet(filePath) {
    if (!fs.existsSync(filePath)) return [];

    const wsId = path.basename(filePath).replace('.tex', '');
    const content = fs.readFileSync(filePath, 'utf-8');
    const enumMatch = content.match(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/);
    if (!enumMatch) return [];

    const enumContent = enumMatch[1];
    const items = enumContent.split(/\\item\s*\\textbf\{(.*?)\}/).slice(1);

    const questions = [];
    for (let i = 0; i < items.length; i += 2) {
        const topic = items[i];
        let questionContent = items[i+1].trim();
        const qIdRaw = `q${i/2 + 1}`;
        const solutionKey = `${wsId}_${qIdRaw}`;

        let options = [];
        const tasksMatch = questionContent.match(/\\begin\{tasks\}(?:\(.*?\))?([\s\S]*?)\\end\{tasks\}/);
        if (tasksMatch) {
            const tasksContent = tasksMatch[1];
            const tasks = tasksContent.split(/\\task/).slice(1).map(t => t.trim());
            options = tasks.map(t => renderMath("$" + t + "$"));
            questionContent = questionContent.replace(tasksMatch[0], '');
        } else {
            options = ["Option A", "Option B", "Option C"]; // Fallback options
        }

        questionContent = renderMath(questionContent);

        let solutionContent = solutionsMap[solutionKey] || "N/A";
        if (solutionContent !== "N/A") {
            solutionContent = renderMath(solutionContent);
        }

        questions.push({
            id: qIdRaw,
            question: questionContent,
            solution: solutionContent,
            options: options.length > 0 ? options : ["True", "False"],
            correctOptionIndex: 0,
            points: 10
        });
    }
    return questions;
}

const courses = [];
const worksheetsList = [];
const lectureFiles = fs.readdirSync(LECTURES_DIR).filter(f => f.endsWith('.tex')).sort();

for (const file of lectureFiles) {
    const filePath = path.join(LECTURES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = content.match(/\\title\{(.*?)\}/);
    const title = titleMatch ? titleMatch[1] : `Lecture ${file}`;
    const id = file.replace('.tex', '');

    const wsFilePath = path.join(WORKSHEETS_DIR, file.replace('lecture', 'worksheet'));
    const wsQuestions = parseWorksheet(wsFilePath);

    const sectionRegex = /\\section(?:\[.*?\])?\{(.*?)\}/g;
    let match;
    const sections = [];
    while ((match = sectionRegex.exec(content)) !== null) {
        sections.push({ index: match.index, title: match[1] });
    }

    const lessons = [];
    for (let i = 0; i < sections.length; i++) {
        const startIndex = sections[i].index;
        const endIndex = i + 1 < sections.length ? sections[i+1].index : content.length;
        const secContent = content.substring(startIndex, endIndex);
        const secTitle = sections[i].title;

        const htmlContent = renderMath(secContent.replace(/\\section(?:\[.*?\])?\{.*?\}/, ''));

        lessons.push({
            id: `${id}-sec-${i + 1}`,
            title: secTitle,
            content: htmlContent,
            quiz: (wsQuestions.length > 0 && i === sections.length - 1 ? wsQuestions : [
                {
                    id: "dummy",
                    question: "Did you understand this lesson?",
                    solution: "N/A",
                    options: ["Yes", "No"],
                    correctOptionIndex: 0,
                    points: 10
                }
            ])
        });
    }

    courses.push({
        id,
        title,
        description: `Topics from ${title}`,
        icon: "FunctionSquare",
        color: "bg-blue-500",
        lessons
    });

    if (wsQuestions.length > 0) {
        worksheetsList.push({
            id: file.replace('lecture', 'worksheet').replace('.tex', ''),
            title: `Worksheet for ${title}`,
            questions: wsQuestions
        });
    }
}

const tsContent = `
export type QuizQuestion = {
	id: string;
	question: string;
	solution: string;
	options: string[];
	correctOptionIndex: number;
	points: number;
};

export type Worksheet = {
	id: string;
	title: string;
	questions: QuizQuestion[];
};

export type Lesson = {
	id: string;
	title: string;
	content: string;
	quiz: QuizQuestion[];
};

export type Course = {
	id: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	lessons: Lesson[];
};

export const courses: Course[] = ${JSON.stringify(courses, null, 2)};

export const worksheets: Worksheet[] = ${JSON.stringify(worksheetsList, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, tsContent.trim());
console.log(`Successfully generated ${OUTPUT_FILE}`);
