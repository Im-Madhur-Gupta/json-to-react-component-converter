const fs = require('fs');

const writeReturn = (
    parentHTMLTag,
    parentHTMLTagClasses,
    inlineCSS,
    eventsAssociated,
    content,
    childComponents,
    fileDesc
) => {
    let eventsDec = '';
    if (eventsAssociated) {
        for (let event of eventsAssociated) {
            eventsDec += `${event.name}={${event.handler}} `;
        }
    }

    const inlineCSSLn = inlineCSS.length ? `style={${inlineCSS}}` : '';

    const parentHTMLOpeningTag = `<${parentHTMLTag} className="${parentHTMLTagClasses}" ${inlineCSSLn} ${eventsDec}>`;

    let innerContent = '';

    // currently, logic is -> if "content" is null -> there are supposed to be child components inside of the parent tag, otherwise the "content" is to placed inside of the parent tag.
    if (content) {
        innerContent = content;
    } else {
        for (let child of childComponents) {
            let propList = '';
            for (let prop of child.propsRequired) {
                propList += `${prop.name}={${prop.value}}`;
            }
            innerContent += `\t\t<${child.componentName} ${propList}/>\n`;
        }
    }
    const returnLn = `return(\n${parentHTMLOpeningTag}\n${innerContent}\n</${parentHTMLTag}>\n);\n`;

    fs.writeSync(fileDesc, returnLn);
};

module.exports = writeReturn;
