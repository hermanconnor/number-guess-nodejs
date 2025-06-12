# 🎯 Number Guessing Game (CLI) - Node.js + TypeScript

Welcome to the **Number Guessing Game** – a fun and interactive command-line game built with **Node.js** and **TypeScript**. Test your luck and deduction skills as you try to guess the secret number chosen by the computer!

> 🤔 Can you guess the number the computer is thinking of? Let's find out!

## ✨ Features

- 🎮 CLI-based interactive gameplay
- 🔢 Random number between 1 and 100
- ⚙️ Difficulty levels: Easy, Medium, Hard
- 💡 Hints if you're struggling

## 🎮 How to Play

The computer will pick a random number between 1 and 100. Your goal is to guess that number within a limited number of chances. Choose your difficulty, make your guesses, and the game will tell you if the secret number is higher or lower than your guess.

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Chalk

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/number-guess-nodejs.git
cd number-guess-nodejs
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Game

```bash
npx tsx src/index.ts
```

#### Or

1.  **Compile the TypeScript code:**

    ```bash
    npx tsc
    ```

    This command compiles the TypeScript files from `src/` into JavaScript files in the `dist/` folder.

2.  **Start the game:**

    ```bash
    node dist/index.js
    ```

## 📸 Sample Gameplay

```
🎉 Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

👉 Enter your guess: 50
❌ Incorrect! The number is less than 50.

👉 Enter your guess: 25
❌ Incorrect! The number is greater than 25.

👉 Enter your guess: 30
🎉 Congratulations! You guessed the correct number in 3 attempts.
```

## 🧠 Difficulty Levels

| Level     | Chances |
| --------- | ------- |
| 🟢 Easy   | 10      |
| 🟡 Medium | 5       |
| 🔴 Hard   | 3       |

## 📄 License

MIT

---

Enjoy the game! 🎉
