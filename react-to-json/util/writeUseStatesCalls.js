const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeUseStatesCalls = (compLineReader, genJSONFile) => {
  fs.writeSync(genJSONFile, `"statesAssociated": [\n`);
  while ((line = getNextLine(compLineReader)).startsWith("const [")) {
    const stateName = line.match(/const \[(.*?)\,/)[1];
    const stateValue = line.match(/useState\((.*?)\)/)[1];
    fs.writeSync(
      genJSONFile,
      `{"name":"${stateName}", "value":"${stateValue}"},\n`
    );
  }
  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeUseStatesCalls;
