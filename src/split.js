const lineByLine = require('n-readlines');
const fs = require('fs');

const split = async (filePath, chunkSize) => {

    const maxChunk = chunkSize;
    const textLines = new lineByLine(filePath);

    let line;
    let lineNumber = 1;
    let chunkArray = Array();
    let chunkNumber = 0;
    const fileList = Array();

    while (line = textLines.next()) {
        chunkArray.push(line.toString('utf8'))
        lineNumber++;
        if (chunkArray.length === maxChunk) {
            createFileFromChunk();
            chunkArray = [];
        }
    }

    if (!textLines.next() && chunkArray.length !== 0) {
        createFileFromChunk();
    }

    return fileList

    function createFileFromChunk() {
        chunkNumber++;
        var file = fs.createWriteStream('out/array' + chunkNumber + '.txt');
        file.on('error', (err) => console.error(err));
        chunkArray.forEach((chunkLine) => file.write(chunkLine + '\n'));
        file.end();
        fileList.push(file.path)
    }

}

module.exports = split