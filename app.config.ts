import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
    ssr: false,
    spaPaths: ['/'],
    build: {
        outDir: 'dist',
    },
})
