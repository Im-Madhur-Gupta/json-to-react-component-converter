const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeFunctions = (compLineReader, genJSONFile) => {
  fs.writeSync(genJSONFile, `"functionsAssociated": [\n`);
  while ((line = getNextLine(compLineReader)).startsWith("const")) {
    const name = line.split(" ")[1];

    const args = line.match(/\= \((.*?)\) \=\>/)[1];
    const argsLn = args
      .split(",")
      .map((i) => `"${i.trim()}"`)
      .join(",");

    let code = "";
    while (!(line = getNextLine(compLineReader)).startsWith("}")) {
      code += line;
    }

    fs.writeSync(
      genJSONFile,
      `{"name":"${name}", "inputArgs":[${argsLn}], "code":"${code}"},\n`
    );
  }
  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeFunctions;
