import { defineConfig } from 'vitepress'
import type { HeadConfig } from 'vitepress'
import type MarkdownIt from 'markdown-it'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { icon } from './icons'

// Canonical production origin (GitHub Pages project site) — drives JSON-LD urls + llms.txt links.
const SITE_URL = 'https://p9-web.github.io/from-vue-to-react'
const SITE_TITLE = 'From Vue to React'
const SITE_DESCRIPTION =
  "A senior Vue developer's path to complete React mastery — reactivity, rendering, the Fiber engine, hooks, state, composition, and React 19."
const COURSE_ID = `${SITE_URL}/#course`
const DOCS_DIR = fileURLToPath(new URL('..', import.meta.url)) // docs/.vitepress -> docs/

// Modules grouped into four journey parts; numbers run in part order — see course-syllabus.md.
// `icon` is a Lucide name (see ./icons) projected into nav/sidebar display text via withIcons().
const part1 = [
  { text: '01 · Architecture & Ecosystem', link: '/module-1-architecture-ecosystem', icon: 'layers' },
  { text: '02 · Reactivity & Rendering', link: '/module-2-reactivity-rendering', icon: 'zap' },
  { text: '03 · Identity & Equality', link: '/module-3-identity-equality', icon: 'fingerprint' },
]
const part2 = [
  { text: '04 · Fiber vs. Vapor', link: '/module-4-fiber-vapor', icon: 'cpu' },
  { text: '05 · Hooks, Closures & Effects', link: '/module-5-hooks-closures', icon: 'braces' },
]
const part3 = [
  { text: '06 · State Management', link: '/module-6-state-management', icon: 'package' },
  { text: '07 · Composition Patterns', link: '/module-7-composition-patterns', icon: 'puzzle' },
]
const part4 = [
  { text: '08 · The React Compiler', link: '/module-8-react-compiler', icon: 'binary' },
  { text: '09 · Actions & Forms', link: '/module-9-actions-forms', icon: 'app-window' },
  { text: '10 · Suspense & Server Components', link: '/module-10-suspense-server-components', icon: 'globe' },
]

// Project the Lucide icon into the menu label (nav/sidebar render `text` via v-html).
// Used for display ONLY — schema/llms.txt read the base arrays above so no SVG leaks into metadata.
type Module = { text: string; link: string; icon: string }
const withIcons = (mods: Module[]) =>
  mods.map((m) => ({ text: icon(m.icon, 16) + m.text, link: m.link }))

// Only modules whose source page actually exists are schema'd / linked
// (the fs.existsSync filter lets a module auto-join nav/schema once its .md lands).
const courseModules = [...part1, ...part2, ...part3, ...part4].filter((m) =>
  fs.existsSync(path.join(DOCS_DIR, `${m.link.replace(/^\//, '')}.md`)),
)

// Shape authored in each module page's `learn:` frontmatter block — the single source of truth
// projected into machine metadata (this file) and the on-page StudyGuide (theme/StudyGuide.vue).
type Learn = {
  module: number
  level: string
  timeRequired: string // ISO-8601 duration, e.g. PT45M
  prerequisites: string[]
  outcomes: string[]
  concepts: string[]
  misconceptions: string[]
  selfTests: number
  primarySources?: string[]
  teachingApproach: string
}

// Collected per page during transformPageData, consumed in buildEnd to emit llms.txt.
type CollectedPage = {
  module: number
  title: string
  url: string
  description: string
  teaches: string[]
  relativePath: string
}
const learnPages: CollectedPage[] = []

const absUrl = (relativePath: string) =>
  relativePath === 'index.md'
    ? `${SITE_URL}/`
    : `${SITE_URL}/${relativePath.replace(/\.md$/, '.html')}`

// schema.org Course tying the modules together as one curriculum — emitted on home + syllabus.
function courseLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': COURSE_ID,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    inLanguage: 'en',
    provider: { '@type': 'Organization', name: SITE_TITLE, url: `${SITE_URL}/` },
    hasPart: courseModules.map((m) => ({
      '@type': 'LearningResource',
      name: m.text.replace(/^\d+\s*·\s*/, ''),
      url: `${SITE_URL}${m.link}.html`,
    })),
  }
}

// schema.org LearningResource for one module — the deep, per-page learning hints for crawlers.
function learningResourceLd(title: string, description: string, url: string, learn: Learn) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${url}#learn`,
    name: title,
    description,
    url,
    inLanguage: 'en',
    learningResourceType: 'course module',
    educationalLevel: learn.level,
    timeRequired: learn.timeRequired,
    teaches: learn.concepts,
    competencyRequired: learn.prerequisites,
    assesses: learn.outcomes,
    isPartOf: { '@type': 'Course', '@id': COURSE_ID, name: SITE_TITLE, url: `${SITE_URL}/` },
    ...(learn.primarySources?.length ? { citation: learn.primarySources } : {}),
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/from-vue-to-react/', // GitHub Pages project-site subpath
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  appearance: 'dark', // terminal theme is dark-first; toggle preserved
  vite: {
    server: { port: 5180 }, // avoid the default 5173 (and the sibling course on 5179)
  },
  head: [
    // favicon — base-prefixed on purpose: VitePress does not prepend `base` to head hrefs.
    ['link', { rel: 'icon', type: 'image/png', href: '/from-vue-to-react/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/from-vue-to-react/favicon.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
      },
    ],
  ],
  // Project authored learning-design frontmatter into per-page crawler metadata.
  transformPageData(pageData) {
    const rel = pageData.relativePath
    const fm = pageData.frontmatter
    const head: HeadConfig[] = (fm.head ??= [])
    const title = (fm.title as string) || pageData.title || SITE_TITLE
    const description = (fm.description as string) || SITE_DESCRIPTION

    // Home + syllabus carry the Course schema that binds the modules into one path.
    if (rel === 'index.md' || rel === 'course-syllabus.md') {
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(courseLd())])
      return
    }

    const learn = fm.learn as Learn | undefined
    if (!learn) return

    const url = absUrl(rel)
    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(learningResourceLd(title, description, url, learn)),
    ])
    head.push(['meta', { name: 'ai:teaches', content: learn.concepts.join(', ') }])
    head.push(['meta', { name: 'ai:prerequisites', content: learn.prerequisites.join(', ') }])
    head.push(['meta', { name: 'ai:misconceptions', content: learn.misconceptions.join(' | ') }])
    head.push(['meta', { name: 'ai:how-to-teach', content: learn.teachingApproach }])

    // Collect for llms.txt; dedupe by module since dev HMR re-runs this hook.
    if (!learnPages.some((p) => p.module === learn.module)) {
      learnPages.push({ module: learn.module, title, url, description, teaches: learn.concepts, relativePath: rel })
    }
  },
  // Emit llms.txt (curated map) + llms-full.txt (all module markdown) for AI assistants. Build only.
  buildEnd(siteConfig) {
    if (!learnPages.length) return
    const sorted = [...learnPages].sort((a, b) => a.module - b.module)

    const index = [
      `# ${SITE_TITLE}`,
      '',
      `> ${SITE_DESCRIPTION}`,
      '',
      'Master-level React for senior Vue developers. Each module maps a deeply-internalized Vue mental model to its React equivalent — and explains exactly where the two diverge in execution.',
      '',
      '## Modules',
      '',
      ...sorted.map((p) => `- [${p.title}](${p.url}): ${p.description} Teaches: ${p.teaches.join(', ')}.`),
      '',
      '## Optional',
      '',
      `- [Course syllabus](${SITE_URL}/course-syllabus.html): the full curriculum, organized into four journey parts.`,
      `- [False Friends](${SITE_URL}/false-friends.html): Vue APIs that look like React's but diverge in execution.`,
      `- [Full text, all modules inlined](${SITE_URL}/llms-full.txt): for one-shot ingestion.`,
      '',
    ].join('\n')
    fs.writeFileSync(path.join(siteConfig.outDir, 'llms.txt'), index)

    const full = [`# ${SITE_TITLE}`, '', `> ${SITE_DESCRIPTION}`, '']
    for (const p of sorted) {
      const md = fs.readFileSync(path.join(DOCS_DIR, p.relativePath), 'utf-8')
      full.push('', '---', '', `<!-- SOURCE: ${p.url} -->`, '', md)
    }
    fs.writeFileSync(path.join(siteConfig.outDir, 'llms-full.txt'), full.join('\n'))
  },
  markdown: {
    // tag blockquotes by their opening marker so the theme can style them:
    // "Self-Test" → REPL-probe aside; "The translation" → Vue→React mapping aside.
    config: (md: MarkdownIt) => {
      md.core.ruler.push('marker_blockquote', (state) => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i].type !== 'blockquote_open') continue
          for (let j = i + 1; j < tokens.length && tokens[j].type !== 'blockquote_close'; j++) {
            if (tokens[j].type === 'inline') {
              const c = tokens[j].content.trimStart()
              if (/^\**\s*self-test/i.test(c)) tokens[i].attrJoin('class', 'self-test')
              else if (/^\**\s*the translation/i.test(c)) tokens[i].attrJoin('class', 'translation')
              break
            }
          }
        }
      })

      // Render ```mermaid fences as the client-side <Mermaid> component (see theme/Mermaid.vue).
      // Source is encodeURIComponent'd so it survives the HTML attribute + Vue template compile.
      const defaultFence =
        md.renderer.rules.fence ??
        ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        if (tokens[idx].info.trim().toLowerCase() === 'mermaid') {
          return `<Mermaid code="${encodeURIComponent(tokens[idx].content)}"></Mermaid>`
        }
        return defaultFence(tokens, idx, options, env, self)
      }
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: icon('home', 15) + 'Home', link: '/' },
      { text: icon('list', 15) + 'Syllabus', link: '/course-syllabus' },
      { text: icon('arrow-left-right', 15) + 'False Friends', link: '/false-friends' },
      {
        // One dropdown; each Part is a titled group, which VitePress renders as a separated section.
        text: icon('grid-3x3', 15) + 'Modules',
        items: [
          { text: 'Part I · Mental-Model Shift', items: withIcons(part1) },
          { text: 'Part II · Execution Engine', items: withIcons(part2) },
          { text: 'Part III · State & Composition', items: withIcons(part3) },
          { text: 'Part IV · Modern React', items: withIcons(part4) },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: icon('compass', 16) + 'Course Syllabus', link: '/course-syllabus' },
          { text: icon('arrow-left-right', 16) + 'False Friends', link: '/false-friends' },
          { text: icon('book-open', 16) + 'Conclusion', link: '/conclusion' },
        ],
      },
      {
        text: 'Part I · The Mental-Model Shift',
        items: withIcons(part1),
      },
      {
        text: 'Part II · The Execution Engine',
        items: withIcons(part2),
      },
      {
        text: 'Part III · State & Composition',
        items: withIcons(part3),
      },
      {
        text: 'Part IV · Modern React (19+)',
        items: withIcons(part4),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/p9-web/from-vue-to-react' },
    ],
  },
})
