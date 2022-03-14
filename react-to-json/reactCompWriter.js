const fs = require("fs");
const nReadlines = require("n-readlines");
const getNextLine = require("./util/getNextLine");
const writeImports = require("./util/writeImports");
const writeCompName = require("./util/writeCompName");
const writeUseStatesCalls = require("./util/writeUseStatesCalls");
const writeVariables = require("./util/writeVariables");
const writeUseEffectCalls = require("./util/writeUseEffectCalls");
const writeFunctions = require("./util/writeFunctions");
const writeReturn = require("./util/writeReturn");

const reactCompWriter = (compName, genJSONFile, propsRequired = []) => {
  const compLineReader = new nReadlines(
    `${__dirname}/react-components/${compName}.js`
  );

  // writing imports
  // includes initial "{" of json
  writeImports(compLineReader, genJSONFile);

  // writing Comp Name of the functional component
  writeCompName(compLineReader, genJSONFile, propsRequired);

  // writing state declarations
  writeUseStatesCalls(compLineReader, genJSONFile);

  // writing variable declarations
  writeVariables(compLineReader, genJSONFile);

  // writing useEffect calls
  writeUseEffectCalls(compLineReader, genJSONFile);

  // writing function declarations
  writeFunctions(compLineReader, genJSONFile);

  // writing return along with inner content
  // child components arent handled here
  let currLine = writeReturn(compLineReader, genJSONFile);

  console.log("currLine", currLine);

  // writing child components
  fs.writeSync(genJSONFile, `"childComponents": [\n`);
  // will be a child component if line starts with "<" but not "</".
  while (currLine && currLine.startsWith("<") && !currLine.startsWith("</")) {
    let childCompName = "";
    let childCompProps = [];
    if (currLine.includes(">")) {
      currLineArr = currLine.split(" ");
      childCompName = currLineArr[0].substring(1, currLineArr[0].length);
      for (let i = 1; i < currLineArr.length - 1; i++) {
        const propName = currLineArr[i].substring(
          0,
          currLineArr[i].indexOf("=")
        );
        const propValue = currLineArr[i].substring(
          currLineArr[i].indexOf("=") + 1,
          currLineArr[i].length
        );

        childCompProps.push({ name: propName, value: propValue });
      }
    } else {
      // multi lined child component
      childCompName = currLine.substring(1, currLine.length);
      while (!(currLine = getNextLine(compLineReader)).startsWith("/>")) {
        const propName = currLine.substring(0, currLine.indexOf("="));
        const propValue = currLine.substring(
          currLine.indexOf("=") + 1,
          currLine.length
        );
        childCompProps.push({ name: propName, value: propValue });
      }
    }

    console.log("childCompName", childCompName);

    reactCompWriter(childCompName, genJSONFile, childCompProps);
    currLine = getNextLine(compLineReader);
    fs.writeSync(genJSONFile, `},\n`);
  }
  fs.writeSync(genJSONFile, `],\n`);

  fs.writeSync(genJSONFile, `}\n`);
};

module.exports = reactCompWriter;
