const fs = require('fs');
const jsonValuesWriter = require('./jsonValuesWriter');

const jsonToReact = (compObj) => {
    // async option -
    //   const fileStream = fs.createWriteStream(
    //     `./gen-components/${compObj.componentName}`
    //   );

    // sync option -
    // preferred to maintain order of lines in the component
    const fileDesc = fs.openSync(
        `${__dirname}/gen-components/${compObj.componentName}.js`,
        'w'
    );

    jsonValuesWriter(compObj, fileDesc);

    // adding recursive calls for all the child components
    for (let child of compObj.childComponents) {
        jsonToReact(child);
    }
};

module.exports = jsonToReact;
