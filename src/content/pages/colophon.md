---
title: "Colophon"
description: "How this site is built."
---

# Colophon

This site is built, managed, and published entirely through conversation with [Claude Code](https://claude.ai/code). No CMS, no admin panel, no content editor. When I want to publish something, I tell Claude what I want, and it creates the files, builds the page, and deploys.

## The Stack

- **Framework:** [Astro](https://astro.build):fast, content-focused, great MDX support
- **Styling:** [Tailwind CSS](https://tailwindcss.com):utility-first, pairs perfectly with AI-generated markup
- **Content:** Markdown and MDX files in the repo. No database for content.
- **Deployment:** [Vercel](https://vercel.com):auto-deploy on git push
- **Search:** [Pagefind](https://pagefind.app):client-side, zero-config, privacy-friendly
- **Fonts:** Inter + JetBrains Mono
- **Analytics:** Privacy-friendly, no cookies

## Philosophy

This site is an experiment in AI-native content management. Instead of a CMS with a GUI, the "interface" is natural language. Every post, every component, every design decision was made through conversation.

The content lives as plain files in a git repository. It's portable, version-controlled, and will outlast any CMS.

Is this approach for everyone? No. But it's perfect for someone who spends all day in a terminal and thinks in markdown.
