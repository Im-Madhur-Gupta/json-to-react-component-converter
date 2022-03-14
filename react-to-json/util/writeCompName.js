const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeCompName = (compLineReader, genJSONFile, propsRequired) => {
  // skip child component import lines till we reach component declaration
  while (!(line = getNextLine(compLineReader)).startsWith("const")) {}

  const compName = line.split(" ")[1];
  const jsonLn = `"componentName": "${compName}",\n`;
  fs.writeSync(genJSONFile, jsonLn);
  fs.writeSync(genJSONFile, `"propsRequired": [\n`);
  for (let prop of propsRequired) {
    fs.writeSync(
      genJSONFile,
      `{"name":"${prop.name}", "value":"${prop.value}"},\n`
    );
  }
  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeCompName;
