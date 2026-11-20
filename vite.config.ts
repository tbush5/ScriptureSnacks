import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // Netlify supplies URL for hosted builds. Set VITE_SITE_URL for manual uploads.
  const siteAddress = env.VITE_SITE_URL || process.env.URL
  const siteUrl = siteAddress ? new URL(siteAddress) : null
  if (siteUrl && !['http:', 'https:'].includes(siteUrl.protocol)) {
    throw new Error('VITE_SITE_URL must be an http or https website address.')
  }

  return {
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    {
      name: 'site-sharing-metadata',
      transformIndexHtml(html) {
        if (!siteUrl) return html
        const imageUrl = new URL('/share-preview.jpg', siteUrl).href
        return {
          html: html.replaceAll('content="/share-preview.jpg"', `content="${imageUrl}"`),
          tags: [{ tag: 'meta', attrs: { property: 'og:url', content: siteUrl.origin + '/' }, injectTo: 'head' }],
        }
      },
    },
  ],
  }
})
