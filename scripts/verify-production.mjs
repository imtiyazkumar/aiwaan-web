import fs from 'node:fs';
import assert from 'node:assert/strict';

const origin = process.argv[2] || 'https://aiwaan.pages.dev';
const source = fs.readFileSync('app/routes.ts', 'utf8');
const routes = ['/', ...Array.from(source.matchAll(/route\("([^"]+)"/g), match => '/' + match[1]).filter(path => !path.includes(':'))];
for (let index = 0; index < routes.length; index += 5) {
    await Promise.all(routes.slice(index, index + 5).map(async path => {
        const response = await fetch(origin + path);
        assert.equal(response.status, 200, path);
        assert(response.headers.get('content-type')?.includes('text/html'), path);
        assert((await response.text()).includes('entry.client-'), path);
    }));
}
const assets = fs.readdirSync('build/client/assets').filter(file => /\.(js|css)$/.test(file)).map(file => 'assets/' + file);
for (let index = 0; index < assets.length; index += 8) {
    await Promise.all(assets.slice(index, index + 8).map(async path => {
        assert.equal((await fetch(origin + '/' + path, { method: 'HEAD' })).status, 200, path);
    }));
}
const apiFiles = fs.readdirSync('build/client/assets').filter(file => file.endsWith('.js') && fs.readFileSync('build/client/assets/' + file, 'utf8').includes('https://aiwan-server.imtiyazah907.workers.dev'));
assert(apiFiles.length > 0, 'Production API URL is missing from the local bundle');
for (const file of apiFiles) {
    const deployed = await fetch(origin + '/assets/' + file);
    assert.equal(await deployed.text(), fs.readFileSync('build/client/assets/' + file, 'utf8'), `Deployed asset differs: ${file}`);
}
console.log(`Production frontend passed: ${routes.length} deep links, ${assets.length} JS/CSS assets, and deployed API configuration.`);
