const fs = require('fs');

const writeFunctions = (functions, fileDesc) => {
    for (let func of functions) {
        const funcCall = `const ${func.name} = (${func.inputArgs.join()})=>{
      ${func.code}
    };\n`;
        fs.writeSync(fileDesc, funcCall);
    }
    fs.writeSync(fileDesc, '\n');
};

module.exports = writeFunctions;
