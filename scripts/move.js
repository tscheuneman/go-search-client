const fs = require('fs');
const path = require('path');

console.log('Moving Files...');

fs.copyFileSync(path.resolve('./serve.json'), path.resolve('./build/serve.json'));