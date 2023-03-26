// {
//   "compilerOptions": {
//     "baseUrl": "src",
//       "paths": {
//       "app/*": ["app/*"],
//         "config/*": ["app/_config/*"],
//           "environment/*": ["environments/*"],
//             "shared/*": ["app/_shared/*"],
//               "helpers/*": ["helpers/*"],
//                 "tests/*": ["tests/*"]
//     },
//   }

// resolveJsonModule for import json file


import * as foo from "./foo";

// moduleSuffixes
// Provides a way to override the default list of file name suffixes to search when resolving a module

// {
//   "compilerOptions": {
//     "moduleSuffixes": [".ios", ".native", ""]
//   }
// }
// ypeScript will look for the relative files./ foo.ios.ts, ./ foo.native.ts, and finally ./foo.ts.