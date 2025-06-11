import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GameConfig, GameState } from '../interfaces/gameInterfaces';
import { Difficulty } from './difficulty';
import chalk from 'chalk';

export class Game {
  private rl: readline.Interface;
  private state: GameState;

  constructor() {
    this.rl = readline.createInterface({ input, output });
    this.state = {
      secretNumber: 0,
      attempts: 0,
      maxChances: 0,
      hintThreshold: 0,
    };
  }

  private displayWelcomeMessage(): void {
    console.log(chalk.blueBright('Welcome to the Number Guessing Game!'));
    console.log("I'm thinking of a number between 1 and 100.");
    console.log(
      'You have a limited number of chances to guess the correct number.',
    );
  }
}
