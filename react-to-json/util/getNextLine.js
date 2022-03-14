const getNextLine = (compLineReader) => {
  let buffer = compLineReader.next();
  return buffer ? buffer.toString("ascii").trim() : null;
};

module.exports = getNextLine;
