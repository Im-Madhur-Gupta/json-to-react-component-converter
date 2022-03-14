const fs = require('fs');

const writeUseStatesCalls = (states, fileDesc) => {
    for (let state of states) {
        const stateFuncName = `set${state.name[0].toUpperCase()}${state.name.substring(
            1
        )}`;
        const stateDec = `const [${state.name}, ${stateFuncName}] = useState(${state.value});\n`;
        fs.writeSync(fileDesc, stateDec);
    }
    fs.writeSync(fileDesc, '\n');
};

module.exports = writeUseStatesCalls;
