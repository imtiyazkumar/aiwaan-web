import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const apiUrl = process.env.VITE_API_URL || 'https://aiwan-server.imtiyazah907.workers.dev';
const url = new URL(apiUrl);
if (url.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(url.hostname)) {
    throw new Error('Production builds require an HTTPS API URL.');
}
const require = createRequire(import.meta.url);
const cli = join(dirname(require.resolve('@react-router/dev/package.json')), 'bin.js');
const result = spawnSync(process.execPath, [cli, 'build'], {
    env: { ...process.env, VITE_API_URL: url.origin },
    stdio: 'inherit',
});
process.exitCode = result.status ?? 1;
