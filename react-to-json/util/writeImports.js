const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeImports = (compLineReader, genJSONFile) => {
  fs.writeSync(genJSONFile, `{\n"importsRequired": [\n`);

  let line;
  while ((line = getNextLine(compLineReader)).startsWith("import")) {
    const name = line.substring(7, line.indexOf("from") - 1);
    const from = line.substring(line.indexOf("from") + 5, line.length - 1);
    fs.writeSync(genJSONFile, `{"name":"${name}", "from":${from}},\n`);
  }

  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeImports;
