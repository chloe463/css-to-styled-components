var fs = require("fs");
var postcss = require("postcss");
var { capitalize, kebabToCamel, snakeToCamel } = require("./utils/cases");

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

const ast = postcss.parse(scss);

const sources = ast.source.input.css.split("\n");

const result = ast.nodes.map(node => {
  if (node.type === "atrule" && node.name === "import") {
    return;
  }
  const name = node.selector ? node.selector
    .replace(/^\./g, "")
    .replace(/-([a-z])/g, (_, p) => p.toUpperCase()) : node.params;

  const start = node.source.start.line;
  const end = node.source.end.line;
  const defs = sources.slice(start, end - 1);

  let styledFnType = `styled.div\``;
  if (node.type === "atrule" && node.name === "keyframes") {
    styledFnType = `keyframes\``;
  } else if (node.type === "decl" && node.name === undefined) {
    return ["const", node.prop.replace(/^\$/, ""), "=", `"${node.value}";`].join(" ");
  }

  return [
    `const ${capitalize(name)} = ${styledFnType}`,
    ...defs,
    `\``,
  ].join("\n");
});

console.log(
  result
    .join("\n")
    .replace(/:.*\s+\$(.*)\;/g, (_, p) => {
      const cameled = p.replace(/-([a-z])/g, (_, p) => p.toUpperCase());
      return `: \${${cameled}};`;
    })
    .replace(/composes:\s*([a-zA-Z0-9-]+)(\sfrom.*)?/g, (match, p) => {
      return [
        `// ${match}`,
        "  ${" + snakeToCamel(kebabToCamel(p)) + "}",
      ].join("\n");
    })
);
