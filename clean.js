const fs = require('fs');
const { opendir } = require('fs/promises');

(async () => {
  const dir = await opendir(`${__dirname}/flatten`);
  for await (const dirent of dir) {
    if (dirent.isFile()) {
      const filename = `${__dirname}/flatten/${dirent.name}`;
      fs.writeFileSync(
        filename,
        fs
          .readFileSync(filename)
          .toString()
          .replace(/\npragma abicoder v2;/g, '')
          .replace(/\n\/\/\sSPDX-License-Identifier:[a-z0-9\s\#\.\-]+\n/gi, '')
          .replace(/\/\/\sSources\sflattened.+\n/gi, ''),
      );
    }
  }
})();
