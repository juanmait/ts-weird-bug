## ts-weird-bug

How to Reproduce:

```bash
git clone https://github.com/juanmait/ts-weird-bug.git
cd ts-weird-bug
npm install
npm start
```

You should see

```
Failed to compile.

[internal]
TypeScript error in [internal](undefined,undefined):
path.charCodeAt is not a function  TSINTERNAL_ERROR
```

**Info**:

- The repo is a slim setup from scratch of a react app managed
  by [create-react-app][cra] with typescript support.
- It depends on a a third party dependency ([csv-parse][csvp]).
- The file that causes the bug (`BUG.ts`) is not even being used by the app.

[cra]: https://create-react-app.dev/
[csvp]: https://github.com/adaltas/node-csv-parse

**Three things are involve:**

- A npm package that ships an _invalid_ package.json. Specifically,
  the field `types` should be a `string` but in this case is an `array`.
  ```
  "types": [
    "./lib/index.d.ts",
    "./lib/sync.d.ts"
  ]
  ```
- A _bug_ (?) in the `typescript.js` file. A function (`getDirectoryOrExtensionlessFileName`)
  that **under some conditions** reads the value of the package's `types` field assuming
  that will always be a string and doesn't check any further. The result is then used
  by `getEncodedRootLength` with expects a string, and end up by calling `charCodeAt` in an
  array.
- Some black magic by the `react-scripts` build system and the way it
  compiles typescript. The snipped that causes the bug isn't even used by the app,
  it is just there in the `src` folder, not to mention that the bug appears ONLY with
  the given code..

  ```ts
  import { useRef } from "react";

  export const useCsvParser = () => {
    const parserRef = useRef<typeof import("csv-parse") | null>(null);

    return parserRef;
  };
  ```

  ... and it goes away if you change a bit of it. Also, the debugger never stops
  (I had to write to a file using `fs.writeFileSync` to debug). Ultimately seems like
  the code is compiled anyways but you get a warning in the browser as well as in the
  console.

**Some tracings**:

```
at: getDirectoryOrExtensionlessFileName
path: /***/***/ts-weird-bug/node_modules/csv-parse/lib/index.d.ts
content of types field: [ "./lib/index.d.ts", "./lib/sync.d.ts" ]

at: getEncodedRootLength

TypeError: path.charCodeAt is not a function
    at getEncodedRootLength (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:5830:27)
    at isRootedDiskPath (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:5742:16)
    at Object.toPath (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:6163:36)
    at getDirectoryOrExtensionlessFileName (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:99655:49)
    at tryGetModuleNameAsNodeModule (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:99631:70)
    at /***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:99451:88
    at Object.mapDefined (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:704:30)
    at Object.getModuleSpecifiers (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:99451:29)
    at getSpecifierForModuleSymbol (/***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:37232:62)
    at /***/***/ts-weird-bug/node_modules/typescript/lib/typescript.js:37098:39
```
