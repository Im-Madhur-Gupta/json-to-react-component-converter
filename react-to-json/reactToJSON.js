const fs = require("fs");
const reactCompWriter = require("./reactCompWriter");

const reactToJSON = (compName) => {
  const genJSONFile = fs.openSync(
    `${__dirname}/gen-react-component-tree.json`,
    "w"
  );

  reactCompWriter(compName, genJSONFile);

  // adding recursive calls for all the child components
  // for (let child of compObj.childComponents) {
  //     reactCompWriter(child);
  // }
};

module.exports = reactToJSON;
