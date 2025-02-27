import { projects } from '$lib/data/projects/projects.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { title } = await parent();
	let post;
	try {
		post = await import(`../../../lib/data/projects/${params.slug}.md`);
	} catch {
		post = { default: null };
	}

	const meta = projects.find((project) => project.slug === params.slug);
	const currentIndex = projects.findIndex((project) => project.slug === params.slug);

	const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
	const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

	if (!meta) {
		error(404, 'Project not found');
	}

	return {
		title: meta.name + ' | ' + title,
		description: meta.description,
		imageURL: meta.preview.base.placeholder,
		type: 'article',
		author: 'Hu HaoChen',
		datePublished: meta.date,
		keywords: meta.technologies.join(', '),
		PostContent: post.default,
		meta,
		previousProject,
		nextProject
	};
};
