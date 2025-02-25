import type { Technology } from './game-store.svelte';

export { default as Technologies } from './technologies.svelte';

export const technologies: Technology[] = [
	{
		name: 'HTML',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg'
	},
	{
		name: 'CSS',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg'
	},
	{
		name: 'TypeScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg'
	},
	{
		name: 'Python',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
	},
	{
		name: 'Svelte',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-plain.svg'
	},
	{
		name: 'Tailwind CSS',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
	},
	{
		name: 'Node.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg'
	},
	{
		name: 'Docker',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg'
	}
];
