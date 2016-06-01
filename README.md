# TypeScript with globs
Simple utility that understands [glob patterns](https://github.com/isaacs/node-glob) and can generate `tsconfig.json` files that list all files the TypeScript compiler shoud use.

> Friends don't let friends maintain lists of files.

## Installing
Install side-by-side with `typescript`. e.g.:
```
npm install typescript
npm install typescript-with-globs
```

## Using
Take your existing `tsconfig.json` and rename it to `tsgconfig.json` (note the extra g in the name). Add a new property called `filesGlob` where you can use glob patterns: 
e.g. `tsgconfig.json`:
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

Instead of `tsc`, run `tscg` (note the extra g in the name). This first generates `tsconfig.json` files in the `cwd` and parent directories and then invokes `tsc` with the same arguments.

The `files` property is generated with all the filenames the glob has found. e.g. resulting `tsconfig.json`:
```
{
  "_comment": "Do not edit directly. This is a generated file from tscgconfig.json. See https://github.com/Microsoft/TypeScript/issues/1927.",
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
  ],
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

## License
[MIT](https://github.com/alexandrudima/typescript-with-globs/blob/master/LICENSE)
