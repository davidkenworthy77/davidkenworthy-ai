import { defineCollection, z } from 'astro:content';

const longReads = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    readingTime: z.number().optional(),
    heroImage: z.string().optional(),
    heroCredit: z.string().optional(),
    heroCreditUrl: z.string().url().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    relatedLab: z.string().optional(),
  }),
});

const daily = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    subtype: z.enum(['quick-thought', 'link', 'quote', 'til', 'question']).default('quick-thought'),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    linkTitle: z.string().optional(),
    linkDescription: z.string().optional(),
    linkImage: z.string().optional(),
    linkSource: z.string().optional(),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

const lab = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'complete', 'archived']).default('active'),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    thumbnail: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});

const ask = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    askedBy: z.string().default('Anonymous'),
    date: z.coerce.date(),
    topic: z.enum(['ai', 'product', 'career', 'tools', 'other']).default('other'),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'long-reads': longReads,
  daily,
  lab,
  ask,
  pages,
};
