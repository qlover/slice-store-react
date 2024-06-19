import { execSync } from 'child_process';
import { publishWithLocal } from './scripts/publish.cjs';

const codeFormatting = async () => {
  await execSync('npm run prettier', { stdio: 'inherit' });
};

export const publishLocal = async () => {
  publishWithLocal();
};

export const build = async () => {
  await codeFormatting();
  await execSync('npm run clean:build', { stdio: 'inherit' });
  await execSync('npx tsup', { stdio: 'inherit' });
};
