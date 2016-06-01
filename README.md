# TypeScript with globs
Simple utility that understands [glob patterns](https://github.com/isaacs/node-glob) in `tsconfig.json`.

> Friends don't let friends maintain lists of files.

## Installing
Install side-by-side with `typescript`. e.g.:
```
npm install typescript
npm install typescript-with-globs
```

## Using
Add a new property called `filesGlob` where you can use glob patterns: 
e.g. `tsconfig.json`:
```
{
    "compilerOptions": {
        "module": "amd",
        "outDir": "out",
        "target": "es5"
    },
    "filesGlob": [
        "src/*.ts",
        "lib/*.d.ts",
        "node_modules/monaco-editor-core/monaco.d.ts"
    ]
}
```

Instead of `tsc`, run `tscg` (note the extra g in the name). This first updates `tsconfig.json` with the found files and then invokes `tsc` with the same arguments.

The `files` property is generated with all the filenames the glob has found. e.g. updated `tsconfig.json`:
```
{
  "compilerOptions": {
    "module": "amd",
    "outDir": "out",
    "target": "es5"
  },
  "filesGlob": [
    "src/*.ts",
    "lib/*.d.ts",
    "node_modules/monaco-editor-core/monaco.d.ts"
  ],
  "files": [
    "src/languageFeatures.ts",
    "src/mode.ts",
    "src/monaco.contribution.ts",
    "src/tokenization.ts",
    "src/typescript.ts",
    "src/worker.ts",
    "src/workerManager.ts",
    "lib/lib-es6-ts.d.ts",
    "lib/lib-ts.d.ts",
    "lib/typescriptServices.d.ts",
    "node_modules/monaco-editor-core/monaco.d.ts"
  ]
}
```

## License
[MIT](https://github.com/alexandrudima/typescript-with-globs/blob/master/LICENSE)
