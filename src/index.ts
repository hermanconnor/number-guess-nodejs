import { Game } from './game/Game';

async function main() {
  const game = new Game();

  await game.startGame();
}

main();
