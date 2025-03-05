export const projects = [
	{
		slug: 'qibaodian',
		name: 'qibaodian (起爆点)',
		description: 'SAAS platform for stock buying and selling signals prediction.',
		type: 'external',
		href: {
			url: 'https://qibaodian.net',
			type: 'external'
		},
		preview: {
			base: {
				type: 'video',
				width: 550,
				height: 333,
				src: 'https://cdn.haochen.dev/qibaodian.mp4',
				placeholder:
					'https://cdn.haochen.dev/cdn-cgi/image/fit=contain,format=webp,width=400/qibaodian-placeholder.png'
			}
		},
		date: 'Ongoing',
		technologies: [
			'HTML',
			'CSS',
			'TypeScript',
			'SvelteKit',
			'TimescaleDB',
			'Redis',
			'BullMQ',
			'Docker'
		]
	},
	{
		slug: 'portfolio',
		name: 'haochen.dev',
		description: 'My personal portfolio website, sprinkled with some fun interactions.',
		type: 'external',
		href: {
			url: 'https://github.com/huhaochen06/portfolio',
			type: 'github'
		},
		preview: {
			base: {
				type: 'video',
				width: 931,
				height: 1230,
				src: 'https://cdn.haochen.dev/portfolio.mp4',
				placeholder:
					'https://cdn.haochen.dev/cdn-cgi/image/fit=contain,format=webp,width=400/portfolio-placeholder.png'
			}
		},
		date: 'Feb 2025',
		technologies: ['TypeScript', 'SvelteKit']
	},
	{
		slug: 'njcso-tracker',
		name: 'NJCSO Tracker',
		description: 'A web app to track instruments in the NJCSO.',
		type: 'external',
		href: {
			url: 'https://github.com/huhaochen06/njcso-tracker',
			type: 'github'
		},
		preview: {
			base: {
				type: 'video',
				width: 354,
				height: 768,
				src: 'https://cdn.haochen.dev/njcso-tracker.mp4',
				placeholder:
					'https://cdn.haochen.dev/cdn-cgi/image/fit=contain,format=webp,width=400/njcso-tracker-placeholder.png'
			}
		},
		date: 'Feb 2024',
		technologies: ['Sveltekit', 'XState', 'GSAP', 'Google Sheets API']
	},
	{
		slug: 'ecoquest',
		name: 'ecoQuest',
		description: 'A mobile app built with Expo and React Native for BrainHack 2024.',
		type: 'external',
		href: {
			url: 'https://github.com/Brainhack-please-no/ecoQuest-frontend',
			type: 'github'
		},
		preview: {
			base: {
				type: 'video',
				width: 557,
				height: 854,
				src: 'https://cdn.haochen.dev/ecoquest.mp4',
				placeholder:
					'https://cdn.haochen.dev/cdn-cgi/image/fit=contain,format=webp,width=400/ecoquest-placeholder.png'
			}
		},
		date: 'June 2024',
		technologies: ['Expo', 'React Native', 'TypeScript', 'Flask', 'Python', 'SQLite']
	},
	{
		slug: 'crayon-box-tournament',
		name: 'Crayon Box Tournament',
		description: "A 2D platformer game built with Godot for Hack'n'Roll 2024.",
		type: 'external',
		href: {
			url: 'https://github.com/huhaochen06/Crayon-Box-Tournament',
			type: 'github'
		},
		preview: {
			base: {
				type: 'video',
				width: 560,
				height: 458,
				src: 'https://cdn.haochen.dev/crayon-box-tournament.mp4',
				placeholder:
					'https://cdn.haochen.dev/cdn-cgi/image/fit=contain,format=webp,width=400/crayon-box-tournament-placeholder.png'
			}
		},
		date: 'Jan 2024',
		technologies: ['Godot', 'GDScript']
	}
];
