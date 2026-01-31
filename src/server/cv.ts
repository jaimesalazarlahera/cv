import { createServerFn } from '@tanstack/react-start'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export const getCVContent = createServerFn({ method: 'GET' }).handler(async () => {
  const root = path.resolve('experiences')

  const loadFolder = async (folderPath: string) => {
    let entries
    try {
      entries = await fs.readdir(folderPath, { withFileTypes: true })
    } catch (e) {
      console.warn(`Could not read directory: ${folderPath}`, e)
      return {}
    }

    const content: Record<string, any> = {}

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry.name)

      if (entry.isDirectory()) {
        content[entry.name] = await loadFolder(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const raw = await fs.readFile(fullPath, 'utf-8')
        const { data, content: markdown } = matter(raw)
        const key = path.parse(entry.name).name
        content[key] = { frontmatter: data, content: markdown }
      }
    }
    return content
  }

  return await loadFolder(root)
})