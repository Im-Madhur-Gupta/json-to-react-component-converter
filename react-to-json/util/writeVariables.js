const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeVariables = (compLineReader, genJSONFile) => {
  fs.writeSync(genJSONFile, `"generalVariablesAssociated": [\n`);
  while ((line = getNextLine(compLineReader)).startsWith("const ")) {
    const varName = line.match(/const (.*?) /)[1];
    const varValue = line.match(/\= (.*?)\;/)[1];
    fs.writeSync(
      genJSONFile,
      `{"name":"${varName}", "value":"${varValue}"},\n`
    );
  }
  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeVariables;
