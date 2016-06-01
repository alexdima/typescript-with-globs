
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var handled = {};

/**
 * Walk up all folders and discover `tsgconfig.json` files.
 */
function handleRecipeFiles(folderPath) {
    if (handled[folderPath]) {
        return;
    }
    handled[folderPath] = true;

    handleRecipeFile(path.join(folderPath, 'tsgconfig.json'));
    handleRecipeFiles(path.dirname(folderPath));
}

/**
 * Given a recipe is found at `recipePath`, create a `tsconfig.json` sibling file with the glob resolved.
 */
function handleRecipeFile(recipePath) {
    var contents = null;
    try {
        contents = fs.readFileSync(recipePath);
    } catch (err) {
        // Not finding a recipe is OK
        return;
    }

    var config = null;
    try {
        config = JSON.parse(contents.toString());
    } catch (err) {
        // Finding a recipe that cannot be parsed is a disaster
        console.log('Error in parsing JSON for ' + recipePath);
        process.exit(-1);
    }

    // Determine the glob patterns
    var filesGlob = ['**/*.ts'];
    if (typeof config.filesGlob === 'string') {
        filesGlob = [config.filesGlob];
    } else if (Array.isArray(config.filesGlob)) {
        filesGlob = config.filesGlob;
    }

    var foundFiles = findFiles(recipePath, filesGlob);
    var resultConfig = {
        _comment: "Do not edit directly. This is a generated file from tscgconfig.json. See https://github.com/Microsoft/TypeScript/issues/1927.",
        files: foundFiles
    };
    for (var prop in config) {
        resultConfig[prop] = config[prop];
    }

    var resultTxt = JSON.stringify(resultConfig, null, '  ');
    var resultPath = path.join(path.dirname(recipePath), 'tsconfig.json');
    fs.writeFileSync(resultPath, resultTxt);
    console.log('Created ' + resultPath);
}

function findFiles(recipePath, filesGlob) {
    var folderPath = path.dirname(recipePath);

    var result = [];
    filesGlob.forEach(function(globPattern) {
        result = result.concat(glob.sync(globPattern, {
            cwd: folderPath
        }));
    });
    return result;
}

handleRecipeFiles(process.cwd());

require('../../typescript/lib/tsc');
