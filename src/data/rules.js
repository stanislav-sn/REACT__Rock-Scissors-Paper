const rulesData = [
	{
		id: 'rule1',
		title: 'Players:',
		content: [
			'User: Chooses a hand gesture by clicking on the corresponding button (Rock, Scissors, Paper).',
			'Computer: Automatically selects its hand gesture.',
		],
	},
	{
		id: 'rule2',
		title: 'Hand Gestures:',
		content: ['Rock, Scissors, Paper - same as in the classic game.'],
	},
	{
		id: 'rule3',
		title: 'Determining the Winner:',
		content: [
			'Rock defeats Scissors.',
			'Scissors defeat Paper.',
			'Paper defeats Rock.',
		],
	},
	{
		id: 'rule4',
		title: 'Scoring:',
		content: [
			'After each round, if there is a winner, they receive +1 point in the Score field.',
			'A tie does not affect the score, no points are added.',
		],
	},
	{
		id: 'rule5',
		title: 'Resetting Scores:',
		content: [
			'The player can click the "Reset" button to reset the score and start anew.',
		],
	},
	{
		id: 'rule6',
		title: 'Gameplay:',
		content: [
			'The player selects their hand gesture.',
			'The computer automatically selects its hand gesture.',
			'The winner is determined, and the score is updated if there is a winner.',
			"Information about each player's choice and the current score is displayed.",
			'The game continues with a new round.',
		],
	},
	{
		id: 'rule7',
		title: 'Ending the Game and Progress Saving:',
		content: [
			'The game can continue indefinitely.',
			'The player can choose to end the game at any time.',
			'Upon exiting the game and returning after some time, the User and Computer scores will be saved, allowing the player to resume the game with the current score.',
		],
	},
	{
		id: 'rule8',
		title: 'Interface:',
		content: [
			'Buttons for choosing hand gestures (Rock, Scissors, Paper).',
			'Field for displaying choices and the current score.',
			'"Reset" button for score reset.',
		],
	},
];

export default rulesData;
