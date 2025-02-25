export const load = async ({ parent }) => {
	const { title } = await parent();
	return {
		title: 'Gallery | ' + title,
		description: 'A collection of my photos, taken during my travels.'
	};
};
