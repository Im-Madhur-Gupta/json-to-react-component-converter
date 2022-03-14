const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeUseEffectCalls = (compLineReader, genJSONFile) => {
  fs.writeSync(genJSONFile, `"useEffectCallsMade": [\n`);
  while ((line = getNextLine(compLineReader)).startsWith("useEffect")) {
    let code = "";
    while (!(line = getNextLine(compLineReader)).startsWith("},")) {
      code += line;
    }
    const dependencies = line.match(/\[(.*?)\]/)[1];
    const dependenciesLn = dependencies
      .split(",")
      .map((i) => `"${i.trim()}"`)
      .join(",");
    fs.writeSync(
      genJSONFile,
      `{"code":"${code}", "dependencies":[${dependenciesLn}]},\n`
    );
  }
  fs.writeSync(genJSONFile, `],\n`);
};

module.exports = writeUseEffectCalls;
