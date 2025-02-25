const MESSAGES = {
	next: [
		"Impressive! Let's kick it up a notch!",
		'Fantastic memory! Ready for more?',
		"You're crushing it! Next challenge incoming!",
		'Brilliant work! Time to level up!',
		"Perfect sequence! Let's make it tougher!",
		'Outstanding! Can you handle the next one?',
		'Excellent recall! The next round awaits!',
		'Superb performance! Ready to push further?',
		'Masterful memory! Time to raise the stakes!',
		'Incredible focus! The challenge intensifies!'
	],
	lose: [
		'Uh oh! Better luck next time!',
		'Almost had it! Give it another shot!',
		'Nice try! Want to challenge yourself again?',
		'So close! Ready for another attempt?',
		'Not quite! But practice makes perfect!',
		'No worries! Everyone starts somewhere!',
		'Keep going! You learn more with each try!',
		'That was tricky! Want another go?',
		"Don't give up! You're getting better!",
		'Challenge accepted? Try again!'
	],
	win: [
		'Incredible! You mastered all the sequences!',
		'Outstanding memory skills! You conquered it all!',
		'Perfect performance! You are a tech wizard!',
		'Phenomenal job! You beat the ultimate challenge!',
		'Absolutely brilliant! You achieved mastery!',
		'Legendary status achieved! You did it!',
		'Mind-blowing performance! A true champion!',
		'Exceptional mastery! You are unstoppable!',
		'Supreme victory! You are in a league of your own!',
		'Spectacular achievement! You are truly remarkable!'
	]
} as const;

type MessageType = keyof typeof MESSAGES;

export function getRandomMessage(type: MessageType): string {
	const messages = MESSAGES[type];
	return messages[Math.floor(Math.random() * messages.length)];
}
