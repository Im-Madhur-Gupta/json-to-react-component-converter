const fs = require('fs');

const writeExports = (componentName, fileDesc) => {
    const exportLn = `}\n\nexport default ${componentName};\n`;
    fs.writeSync(fileDesc, exportLn);
};

module.exports = writeExports;
