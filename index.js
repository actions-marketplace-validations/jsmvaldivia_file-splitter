const split = require("./src/split");
const core = require('@actions/core');


try {
    console.debug(core.getInput('file-path'))
    console.debug(core.getInput('chunk-size'))
    console.debug(core.getInput('chunk'))

    split(core.getInput('file-path'), core.getInput('chunk-size'))
        .then(list => core.setOutput("file-path-list", list));

} catch (error) {
    core.setFailed(error.message);
}