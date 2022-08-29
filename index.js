const split = require("./split");
const core = require('@actions/core');


try {
    const filePath = core.getInput('file-path');
    const chunkSize = core.getInput('chunk-size');
    const outDir = core.getInput('out-dir');

    console.debug("File path: " + filePath)
    console.debug("Chunk size: " + chunkSize)
    console.debug("Out directory: " + outDir)

    split(filePath, chunkSize, outDir)
        .then(list => core.setOutput("file-path-list", list));

} catch (error) {
    core.setFailed(error.message);
}