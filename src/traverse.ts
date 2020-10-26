import { ChildNode } from "postcss";
import { capitalize } from "./utils/cases";

export const traverse = (node: ChildNode, indentLevel = 0) => {
  switch (node.type) {
    case "atrule": {
      return;
    }
    case "decl": {
      if (node.prop.match(/^\$[a-zA-Z0-9]+/)) {
        return `const ${node.prop.replace("$", "")} = "${node.value}";`;
      }
      return `${node.prop}: ${node.value};`;
    }
    case "rule": {
      const declarations: (string | undefined)[] = node.nodes.map(v => traverse(v, indentLevel+1));
      let [element, name] = node.selector.split(/\.|#/);
      const styledFnType = `styled.${element || "div"}`;
      if (indentLevel) {
        const indent = Array.from({ length: indentLevel * 2 }, _ => " ").join("");
        return [
          `${node.selector} {`,
          declarations.map(d => `  ${indent}${d}`).join("\n"),
          `${indent}}`,
        ].join("\n");
      }
      return [
        `const ${capitalize(name)} = ${styledFnType}\``,
        declarations.map(d => `  ${d}`).join("\n"),
        `\`;`,
      ].join("\n");
    }
    case "comment": {
      return;
    }
  }
};
