import fs from "fs";
// import postcss from "postcss";
import { parse } from "scss-parser";
import util from "util";
import { walkNode } from "./traverse2";

const filePath = process.argv[2];

if (!filePath) {
  console.error(`Please give a css file name.`);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`${filePath} does not exists`);
  process.exit(1);
}

const scss = fs.readFileSync(filePath, "utf8").replace(/\s*\/\/.*/g, "");

const ast2 = parse(scss);
console.log(util.inspect(ast2, { depth: 1000, colors: true }));
const r = walkNode(ast2);
console.log(r);
process.exit(0)
// const ast = postcss.parse(scss);

// if (!ast || !ast.source) {
//   console.error(`Failed to parse file content. The given file is invalid css file.`);
//   process.exit(1);
// }

// const result = ast.nodes.map((node) => traverse(node, 0));
// console.log(result.join("\n"));

// const sources = ast.source.input.css.split("\n");

// const result = ast.nodes.map(node => {
//   if (node.type === "atrule" && node.name === "import") {
//     return;
//   }

//   let name = "";
//   let styledFnType = `styled.div\``;
//   let defs: string[] = [];
//   if (node.type === "atrule" && node.name === "keyframes") {
//     styledFnType = `keyframes\``;
//   } else if (node.type === "rule") {
//     name = node.selector
//       .replace(/^\./g, "")
//       .replace(/-([a-z])/g, (_, p) => p.toUpperCase());

//     const start = node.source?.start?.line;
//     const end = node.source?.end?.line;
//     defs = start && end ? sources.slice(start, end - 1) : [];
//   } else if (node.type === "decl") {
//     return ["const", node.prop.replace(/^\$/, ""), "=", `"${node.value}";`].join(" ");
//   }

//   return [
//     `const ${capitalize(name)} = ${styledFnType}`,
//     ...defs,
//     `\``,
//   ].join("\n");
// });

// console.log(
//   result
//     .join("\n")
//     .replace(/:.*\s+\$(.*)\;/g, (_, p) => {
//       const cameled = p.replace(/-([a-z])/g, (_: number, p: string) => p.toUpperCase());
//       return `: \${${cameled}};`;
//     })
//     .replace(/composes:\s*([a-zA-Z0-9-]+)(\sfrom.*)?/g, (match, p) => {
//       return [
//         `// ${match}`,
//         "  ${" + snakeToCamel(kebabToCamel(p)) + "}",
//       ].join("\n");
//     })
// );
