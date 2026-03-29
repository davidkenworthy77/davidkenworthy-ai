import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('daily', ({ data }) => data.status === 'published'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'dk.ai - Daily',
    description: 'Quick thoughts, hot takes, and things I found interesting today.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.body?.slice(0, 200) || post.data.title,
      link: `/daily#${post.slug}`,
      categories: post.data.tags,
    })),
  });
}
