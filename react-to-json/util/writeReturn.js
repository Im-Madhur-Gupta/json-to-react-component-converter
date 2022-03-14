const fs = require("fs");
const getNextLine = require("./getNextLine");

const writeReturn = (compLineReader, genJSONFile) => {
  let line = getNextLine(compLineReader);
  console.log("line",line)
  let parentHTMLOpeningTag = "";
  if (line.startsWith("return")) {
    if (!line.includes("<")) {
      line = getNextLine(compLineReader);
    } else {
      line = line.substring(7, line.length);
    }

    while (!line.includes(">")) {
      parentHTMLOpeningTag += line;
      line = getNextLine(compLineReader);
    }
    parentHTMLOpeningTag += line;

    let parentHTMLTag = "";
    let parentHTMLTagClasses = "";
    let inlineCSS = "{}";
    let eventsAssociated = [];
    let innerContent = null;
    if (
      !parentHTMLOpeningTag.includes("className") &&
      !parentHTMLOpeningTag.includes("style") &&
      !parentHTMLOpeningTag.includes("on")
    ) {
      parentHTMLTag = parentHTMLOpeningTag.substring(
        1,
        parentHTMLOpeningTag.indexOf(">")
      );
      innerContent = parentHTMLOpeningTag.match(/\>(.*?)\</)[1];
    } else {
      parentHTMLTag = parentHTMLOpeningTag.substring(
        1,
        Math.min(
          parentHTMLOpeningTag.indexOf(">"),
          parentHTMLOpeningTag.indexOf("className")
        )
      );
      if (parentHTMLOpeningTag.includes("className")) {
        parentHTMLTagClasses =
          parentHTMLOpeningTag.match(/className\=\"(.*?)\"/)[1];
      }
      if (parentHTMLOpeningTag.includes("style")) {
        const inlineSplitArr =
          parentHTMLOpeningTag.match(/style\=\{\{(.*?)\}\}/);
        inlineCSS = inlineSplitArr ? inlineSplitArr[1] : "{}";
      }
      let tempStr = parentHTMLOpeningTag;
      // while (tempStr.includes("on")) {
      while (tempStr.match(/on[A-Z](.*?)\=\{(.*?)\}/)) {
        // console.log(tempStr);
        let matchedSubStr = tempStr.match(/on[A-Z](.*?)\=\{(.*?)\}/)[0];
        tempStr = tempStr.substring(
          tempStr.indexOf(matchedSubStr) + matchedSubStr.length
        );

        let params = matchedSubStr.match(/on(.*?)\=\{(.*?)\}/);
        eventsAssociated.push({
          name: params[1],
          handler: params[2],
        });
      }
    }
    fs.writeSync(genJSONFile, `"parentHTMLTag": "${parentHTMLTag}",\n`);
    fs.writeSync(
      genJSONFile,
      `"parentHTMLTagClasses": "${parentHTMLTagClasses}",\n`
    );
    fs.writeSync(genJSONFile, `"inlineCSS": '{${inlineCSS}}',\n`);
    fs.writeSync(genJSONFile, `"eventsAssociated": [\n`);
    for (let event of eventsAssociated) {
      fs.writeSync(
        genJSONFile,
        `{"name":"${event.name}", "handler":"${event.handler}"},\n`
      );
    }
    fs.writeSync(genJSONFile, `],\n`);

    // writing inner content or JSX depending on what is present
    line = getNextLine(compLineReader);
    if (!line.startsWith("<") && !innerContent) {
      // only content is present
      innerContent = line;
    }
    innerContentLn = innerContent !== null ? `"${innerContent}"` : null;
    fs.writeSync(genJSONFile, `"content": ${innerContentLn},\n`);
    return line; // to be returned in order to handle child components
  }
};

module.exports = writeReturn;
