import { getRandomMessage } from './messages';

export type Technology = {
	name: string;
	icon: string;
};

export class GameStore {
	state = $state({
		gameStarted: false,
		allowInput: true,
		totalStages: 5,
		stage: 1,
		stageWon: false,
		gameWon: false,
		gameLost: false,
		message: '',
		correctOrders: [] as number[][],
		selectedTechnologies: [] as number[],
		wrongTechnologies: [] as number[],
		animating: false
	});

	currentStageOrder = $derived(this.state.correctOrders[this.state.stage - 1] || []);
	isStageComplete = $derived(
		this.state.selectedTechnologies.length === this.currentStageOrder.length
	);

	constructor(private technologies: Technology[]) {
		this.state.correctOrders = this.generateRandomOrders();
	}

	generateRandomOrders() {
		return Array.from({ length: this.state.totalStages }, (_, i) => {
			const sequenceLength = 4 + i;
			const available = Array.from({ length: this.technologies.length }, (_, i) => i);

			return Array.from({ length: sequenceLength }, () => {
				const randomIndex = Math.floor(Math.random() * available.length);
				return available.splice(randomIndex, 1)[0];
			});
		});
	}

	restart() {
		this.state.gameStarted = false;
		this.state.stage = 1;
		this.state.totalStages = 5;
		this.state.allowInput = true;
		this.state.stageWon = false;
		this.state.gameWon = false;
		this.state.gameLost = false;
		this.state.correctOrders = this.generateRandomOrders();
		this.state.message = `Stage ${this.state.stage} of ${this.state.totalStages}`;
		this.state.selectedTechnologies = [];
		this.state.wrongTechnologies = [];
	}

	async playAnimation() {
		if (this.state.animating) return;

		this.state.animating = true;
		this.state.allowInput = false;
		this.state.selectedTechnologies = [];

		await new Promise((resolve) => setTimeout(resolve, 500));

		for (const index of this.currentStageOrder) {
			this.state.selectedTechnologies = [index];
			await new Promise((resolve) => setTimeout(resolve, 400));
			this.state.selectedTechnologies = [];
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		await new Promise((resolve) => setTimeout(resolve, 250));
		this.state.allowInput = true;
		this.state.animating = false;
	}

	handleTechnologyClick(index: number) {
		if (!this.state.gameStarted) {
			this.restart();
			this.state.gameStarted = true;
			this.playAnimation();
			return;
		}

		if (!this.state.allowInput || this.state.selectedTechnologies.includes(index)) return;

		this.state.selectedTechnologies = [...this.state.selectedTechnologies, index];

		if (index !== this.currentStageOrder[this.state.selectedTechnologies.length - 1]) {
			this.handleWrongSelection(index);
			return;
		}

		if (this.isStageComplete) {
			this.handleStageComplete();
		}
	}

	private handleWrongSelection(index: number) {
		this.state.gameLost = true;
		this.state.allowInput = false;
		this.state.wrongTechnologies.push(index);
		this.state.message = getRandomMessage('lose');
	}

	private handleStageComplete() {
		if (this.state.stage === this.state.totalStages) {
			this.state.gameWon = true;
			this.state.allowInput = false;
			this.state.message = getRandomMessage('win');
		} else {
			this.advanceToNextStage();
		}
	}

	private advanceToNextStage() {
		this.state.stageWon = true;
		this.state.allowInput = false;
		this.state.message = getRandomMessage('next');
		this.state.stage++;

		setTimeout(() => {
			this.state.message = `Stage ${this.state.stage} of ${this.state.totalStages}`;
			this.state.stageWon = false;
		}, 2000);

		setTimeout(() => {
			this.playAnimation();
		}, 2000);
	}
}
