import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const experiments = (await getCollection('lab'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'dk.ai - Lab',
    description: 'Experiments and side projects from Dave Kenworthy.',
    site: context.site!,
    items: experiments.map((exp) => ({
      title: exp.data.title,
      pubDate: exp.data.date,
      description: exp.data.description,
      link: `/lab/${exp.slug}`,
      categories: exp.data.tags,
    })),
  });
}
