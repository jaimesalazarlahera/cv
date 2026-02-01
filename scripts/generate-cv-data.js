import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const root = path.resolve('experiences');

async function loadFolder(folderPath) {
  let entries;
  try {
    entries = await fs.readdir(folderPath, { withFileTypes: true });
  } catch (e) {
    console.warn(`Could not read directory: ${folderPath}`, e);
    return {};
  }

  const content = {};

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);

    if (entry.isDirectory()) {
      content[entry.name] = await loadFolder(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const raw = await fs.readFile(fullPath, 'utf-8');
      const { data, content: markdown } = matter(raw);
      const key = path.parse(entry.name).name;
      content[key] = { frontmatter: data, content: markdown };
    }
  }
  return content;
}

async function main() {
  const cvContent = await loadFolder(root);
  const outputPath = path.resolve('src/data/cv-content.json');
  
  await fs.writeFile(outputPath, JSON.stringify(cvContent, null, 2));
  console.log(`Generated ${outputPath}`);
}

main().catch(console.error);
