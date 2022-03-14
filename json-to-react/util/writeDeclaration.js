const fs = require('fs');

const writeDeclaration = (componentName, propsRequired, fileDesc) => {
    let propList = '';
    for (let prop of propsRequired) {
        propList += `${prop.name}, `;
    }

    if (propList.length > 0) {
        propList = propList.substring(0, propList.length - 2);
    }

    const declaration = `const ${componentName} = ({${propList}}) => {\n`;
    fs.writeSync(fileDesc, declaration);
};

module.exports = writeDeclaration;
