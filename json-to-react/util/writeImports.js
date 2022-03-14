const fs = require('fs');

const writeImports = (imports, children, fileDesc) => {
    // writing required imports
    if (imports && imports.length) {
        for (let importObj of imports) {
            const importLn = `import ${importObj.name} from "${importObj.from}";\n`;
            fs.writeSync(fileDesc, importLn);
        }
        fs.writeSync(fileDesc, '\n');
    }

    // writing imports for child components
    // Note - child components will be later created in the same directory.
    if (children.length) {
        for (let child of children) {
            const importLn = `import ${child.componentName} from "./${child.componentName}";\n`;
            fs.writeSync(fileDesc, importLn);
        }

        fs.writeSync(fileDesc, '\n');
    }
};

module.exports = writeImports;
