import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('long-reads', ({ data }) => data.status === 'published'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'dk.ai - Long Reads',
    description: 'Weekly deep dives into AI, product, and building things.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/long-reads/${post.slug}`,
      categories: post.data.tags,
    })),
  });
}
