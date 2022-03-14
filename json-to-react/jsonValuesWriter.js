const writeImports = require('./util/writeImports');
const writeDeclaration = require('./util/writeDeclaration');
const writeUseStatesCalls = require('./util/writeUseStatesCalls');
const writeVariables = require('./util/writeVariables');
const writeUseEffectCalls = require('./util/writeUseEffectCalls');
const writeFunctions = require('./util/writeFunctions');
const writeReturn = require('./util/writeReturn');
const writeExport = require('./util/writeExport');

const jsonValuesWriter = (compObj, fileDesc) => {
    // destructuring the compObj
    const {
        importsRequired,
        componentName,
        propsRequired,
        statesAssociated,
        generalVariablesAssociated,
        useEffectCallsMade,
        functionsAssociated,
        parentHTMLTag,
        parentHTMLTagClasses,
        eventsAssociated,
        inlineCSS,
        content,
        childComponents,
    } = compObj;

    // writing imports
    writeImports(importsRequired, childComponents, fileDesc);

    // writing declaration of the functional component
    writeDeclaration(componentName, propsRequired, fileDesc);

    // writing state declarations
    writeUseStatesCalls(statesAssociated, fileDesc);

    // writing variable declarations
    writeVariables(generalVariablesAssociated, fileDesc);

    // writing useEffect calls
    writeUseEffectCalls(useEffectCallsMade, fileDesc);

    // writing function declarations
    writeFunctions(functionsAssociated, fileDesc);

    // writing return with JSX
    writeReturn(
        parentHTMLTag,
        parentHTMLTagClasses,
        inlineCSS,
        eventsAssociated,
        content,
        childComponents,
        fileDesc
    );

    // writing export, this also includes the ending "}" of the functional component
    writeExport(componentName, fileDesc);
};

module.exports = jsonValuesWriter;
