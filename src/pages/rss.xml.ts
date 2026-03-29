import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const longReads = await getCollection('long-reads', ({ data }) => data.status === 'published');
  const dailyPosts = await getCollection('daily', ({ data }) => data.status === 'published');
  const labExperiments = await getCollection('lab');

  const items = [
    ...longReads.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/long-reads/${post.slug}`,
      categories: post.data.tags,
    })),
    ...dailyPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.body?.slice(0, 200) || post.data.title,
      link: `/daily#${post.slug}`,
      categories: post.data.tags,
    })),
    ...labExperiments.map((exp) => ({
      title: exp.data.title,
      pubDate: exp.data.date,
      description: exp.data.description,
      link: `/lab/${exp.slug}`,
      categories: exp.data.tags,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'dk.ai - Dave Kenworthy',
    description: 'Building, breaking, and writing about AI. Updated daily-ish.',
    site: context.site!,
    items,
  });
}
