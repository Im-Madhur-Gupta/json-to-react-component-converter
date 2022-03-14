const fs = require('fs');

const writeVariables = (variables, fileDesc) => {
    for (let variable of variables) {
        const variableDec = `const ${variable.name} = ${variable.value};\n`;
        fs.writeSync(fileDesc, variableDec);
    }
    fs.writeSync(fileDesc, '\n');
};

module.exports = writeVariables;
