import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';
import { GameConfig, GameState } from '../interfaces/gameInterfaces';
import { Difficulty } from './difficulty';
import { getRandomNumber } from '../utils/random';

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
    console.log(chalk.blueBright('Welcome to the Number Guessing Game!\n'));
    console.log("I'm thinking of a number between 1 and 100.");
    console.log(
      'You have a limited number of chances to guess the correct number.',
    );
  }

  private async selectDifficulty(): Promise<GameConfig> {
    console.log('\nPlease select the difficulty level:');
    console.log('1. Easy (10 chances)');
    console.log('2. Medium (5 chances)');
    console.log('3. Hard (3 chances)');

    let config: GameConfig;

    while (true) {
      const choice = await this.rl.question('Enter your choice: ');
      const difficultyChoice = parseInt(choice);

      switch (difficultyChoice) {
        case Difficulty.Easy:
          config = { maxChances: 10, hintThreshold: 7 };
          console.log(
            chalk.green(
              '\nGreat! You have selected the Easy difficulty level.',
            ),
          );
          break;

        case Difficulty.Medium:
          config = { maxChances: 5, hintThreshold: 3 };
          console.log(
            chalk.green(
              '\nGreat! You have selected the Medium difficulty level.',
            ),
          );
          break;

        case Difficulty.Hard:
          config = { maxChances: 3, hintThreshold: 1 };
          console.log(
            chalk.green(
              '\nGreat! You have selected the Hard difficulty level.',
            ),
          );
          break;

        default:
          console.log(
            chalk.yellow('Invalid choice. Defaulting to Medium difficulty.'),
          );
          config = { maxChances: 5, hintThreshold: 3 };
      }

      break; // Valid choice, exit the loop
    }

    console.log(
      `You have ${config.maxChances} chances to guess the correct number.`,
    );
    console.log("Let's start the game!");

    return config;
  }

  private provideHint(): void {
    console.log(chalk.bgGreen('\n--- Hint Time! ---'));

    if (this.state.secretNumber % 2 === 0) {
      console.log('Hint: The number is an even number.');
    } else {
      console.log('Hint: The number is an odd number.');
    }

    if (this.state.secretNumber > 50) {
      console.log('Hint: The number is in the upper half (51-100).');
    } else {
      console.log('Hint: The number is in the lower half (1-50).');
    }

    console.log(chalk.green('------------------\n'));
  }

  private endGame(won: boolean): void {
    this.rl.close();

    console.log(chalk.blueBright('Thanks for playing!\n'));

    if (won) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }

  private async askForGuess(): Promise<boolean> {
    const guessInput = await this.rl.question('Enter your guess: ');
    const guess = parseInt(guessInput);
    this.state.attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log(
        chalk.red('Please enter a valid number between 1 and 100.\n'),
      );

      return false;
    }

    if (guess === this.state.secretNumber) {
      console.log(
        chalk.greenBright(
          `\n🎉 Congratulations! You guessed the number in ${this.state.attempts} attempt(s).`,
        ),
      );

      this.endGame(true);
      return true;
    } else {
      console.log(
        `Incorrect! The number is ${
          guess < this.state.secretNumber ? 'greater than' : 'less than'
        } ${guess}`,
      );

      const remainingChances = this.state.maxChances - this.state.attempts;
      console.log(`You have ${remainingChances} attempt(s) left.\n`);

      if (remainingChances === 0) {
        console.log(
          chalk.red(
            `\n😢 Game Over! You ran out of chances. The secret number was ${this.state.secretNumber}`,
          ),
        );

        this.endGame(false);
        return true;
      } else if (
        remainingChances <= this.state.hintThreshold &&
        this.state.attempts > 1
      ) {
        const answer = await this.rl.question(
          'Would you like a hint? (yes/no): ',
        );

        if (answer.toLowerCase() === 'yes') {
          this.provideHint();
        }
      }

      return false;
    }
  }

  public async startGame(): Promise<void> {
    this.displayWelcomeMessage();
    const config = await this.selectDifficulty();

    this.state.maxChances = config.maxChances;
    this.state.hintThreshold = config.hintThreshold;
    this.state.secretNumber = getRandomNumber(1, 100);

    while (this.state.attempts < this.state.maxChances) {
      const gameEnded = await this.askForGuess();

      if (gameEnded) {
        break;
      }
    }
  }
}
