import fs from 'fs/promises';
import { spawn } from 'child_process';
export type TailwindOptions = {
    twStylePath?: string;
    twPrefix?: string;
}
const tailwindBin = require.resolve('../../../../node_modules/@tailwindcss/cli/dist/index.mjs');

const TEMP_HTML = 'temp-content.html';
const TEMP_CSS = 'temp.css';
const OUTPUT_CSS = 'output.css';



// Step 1: Extract classes from HBS using regex
function extractClassesFromHbs(template: string): string[] {
    const matches = template.match(/class=["'`]([^"'`]+)["'`]/g) || [];
    return matches
        .map(m => m.replace(/class=["'`]/, '').replace(/["'`]$/, ''))
        .flatMap(m => m.split(/\s+/));
}

// Step 2: Create a fake HTML snippet using all extracted classes
function generateClassUsageHTML(classes: string[]): string {
    const unique = [...new Set(classes)].filter(Boolean);
    return `<div class="${unique.join(' ')}"></div>`;
}

// Step 3: Build Tailwind CSS using that raw HTML content
export default async function buildTailwindCSS(path = './', { twPrefix, twStylePath }: TailwindOptions = {}): Promise<string> {
    const hbsContent = await fs.readFile(`${path}/widget.html`, 'utf8');
    const themeContent = await fs.readFile(`${twStylePath}`, 'utf8')
        .then(data => {
            //Extract everything between @theme {}

            const themeMatch = data.match(/@theme\s*\{([\s\S]*?)\n\}/);
            if (themeMatch && themeMatch[1]) {
                return `@theme {
                    ${themeMatch[1].trim()}
                }`;
            }
            return '';
        })
        .catch((e: Error) => {
            console.warn(`Theme file not found. Skipping custom TW theme styles.`);
        });


    const classes = extractClassesFromHbs(hbsContent);
    const html = generateClassUsageHTML(classes);

    await fs.writeFile(`${path}/${TEMP_CSS}`, `
        ${twPrefix ? '@config "./tailwind.config.js";' : ''}
        @layer theme, utilities;
        @import "tailwindcss/theme.css" layer(theme);
        @import "tailwindcss/utilities.css" layer(utilities);
        @source "${path}/${TEMP_HTML}";
        ${themeContent}
        `);
    await fs.writeFile(`${path}/${TEMP_HTML}`, html, 'utf8');

    // Create a basic Tailwind config file if a custom prefix is needed.
    if (twPrefix) {
        await fs.writeFile(`${path}/tailwind.config.js`, `
        module.exports = {
            prefix: 'tw-',
        };
    `, 'utf8');
    }

    return new Promise((resolve, reject) => {

        const proc = spawn('node', [
            tailwindBin,
            '--optimize',
            '--input', `${path}/${TEMP_CSS}`,
        ]);

        let css = '';
        let err = '';

        proc.stdout.on('data', chunk => (css += chunk));
        proc.stderr.on('data', chunk => (err += chunk));
        proc.on('error', error => {
            console.error(`Error executing Tailwind CLI: ${error.message}`);
            reject(error);
        });
        proc.on('close', async code => {
            if (code !== 0) reject(new Error(err));
            else {
                await cleanUpTempFiles(path);
                resolve(css.trim());
            }
        });
    });


}

function cleanUpTempFiles(path = './') {

    console.log(`🧹 Cleaning up temporary files in ${path}`);

    return Promise.all([
        fs.unlink(`${path}/${TEMP_HTML}`).catch(() => { }),
        fs.unlink(`${path}/${TEMP_CSS}`).catch(() => { }),
        fs.unlink(`${path}/${OUTPUT_CSS}`).catch(() => { }),
        fs.unlink(`${path}/tailwind.config.js`).catch(() => { }),
    ]);
}