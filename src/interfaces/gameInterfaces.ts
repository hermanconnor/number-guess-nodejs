export interface GameConfig {
  maxChances: number;
  hintThreshold: number;
}

export interface GameState {
  secretNumber: number;
  attempts: number;
  maxChances: number;
  hintThreshold: number;
}
