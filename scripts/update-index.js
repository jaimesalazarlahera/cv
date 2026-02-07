import fs from 'fs';

const assetsDir = 'dist/client/assets';
const indexFile = 'dist/client/index.html';

// Find the index-*.js file
const files = fs.readdirSync(assetsDir);
const indexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (!indexJs) {
    console.error('Could not find index-*.js file');
    process.exit(1);
}

// Generate new index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jaime Salazar</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/cv/assets/${indexJs}"></script>
</body>
</html>`;

fs.writeFileSync(indexFile, html);
console.log(`Updated ${indexFile} with ${indexJs}`);
