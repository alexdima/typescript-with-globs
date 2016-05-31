
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
        return;
    }

    var config = null;
    try {
        config = JSON.parse(contents.toString());
    } catch (err) {
        console.log('Error in parsing JSON for ' + recipePath);
        process.exit(-1);
    }

    var include = ['**/*.ts'];
    if (typeof config.include === 'string') {
        include = [config.include];
    } else if (Array.isArray(config.include)) {
        include = config.include;
    }

    var foundFiles = findFiles(recipePath, include);
    var resultConfig = {
        _msg: "This is a generated file from tscgconfig.json. Please do not edit directly.",
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

function findFiles(recipePath, globPatterns) {
    var folderPath = path.dirname(recipePath);

    var result = [];
    globPatterns.forEach(function(globPattern) {
        result = result.concat(glob.sync(globPattern, {
            cwd: folderPath
        }));
    });
    return result;
}

handleRecipeFiles(process.cwd());

