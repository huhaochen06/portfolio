export const load = async ({ parent }) => {
	const { title } = await parent();
	return {
		title: 'Projects | ' + title,
		description: 'A collection of my projects and experiences.'
	};
};
