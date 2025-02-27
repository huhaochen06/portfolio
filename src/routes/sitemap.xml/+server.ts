import { projects } from '$lib/data/projects/projects';

export async function GET() {
	const pages = [
		{ url: '/', changefreq: 'weekly', priority: 1.0 },
		{ url: '/projects', changefreq: 'weekly', priority: 0.8 },
		{ url: '/gallery', changefreq: 'monthly', priority: 0.8 },
		...projects.map((project) => ({
			url: `/projects/${project.slug}`,
			changefreq: 'monthly',
			priority: 0.6
		}))
	];

	const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
				.map(
					(page) => `
        <url>
          <loc>https://haochen.dev${page.url}</loc>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
				)
				.join('')}
    </urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
