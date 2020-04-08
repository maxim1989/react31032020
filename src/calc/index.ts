import { createInterface } from 'readline';

import { main } from './parser';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question('> ', (answer: string) => {
      const result = main(answer);

      if (result || result === 0) {
        console.log(`Result: ${result}`);
      }

      resolve();
    });
  });

async function app(): Promise<null> {
  while (true) {
    await question();
  }
}

app();