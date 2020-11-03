import type { ChildNode } from "postcss";
import type { Node } from "scss-parser";
import { capitalize } from "./utils/cases";
import { transformVariable } from "./utils/transformVar";

const buildDefinition = (name: string, styledCpFn: string, declarations: string[], indentLevel = 0) => {
  let indent = "  ";
  if (indentLevel) {
    indent = Array.from({ length: indentLevel * 2 }, _ => " ").join("");
    return [
      `${name} {`,
      declarations.map(d => `  ${indent}${d}`).join("\n"),
      `${indent}}`,
    ].join("\n");
  }
  return [
    `const ${capitalize(name)} = ${styledCpFn}\``,
    declarations.map(d => `${indent}${d}`).join("\n"),
    `\`;`,
  ].join("\n");
};

export const traverse = (node: ChildNode, indentLevel = 0) => {
  switch (node.type) {
    case "atrule": {
      if (node.name === "keyframes") {
        const declarations: string[] = node.nodes.map(v => traverse(v, indentLevel+1));
        const name = node.params;
        return buildDefinition(name, "keyframes", declarations, indentLevel);
      } else if (node.name === "media") {
        // TODO
        return "";
      }
      return "";
    }
    case "decl": {
      if (node.prop.match(/^\$[a-zA-Z0-9]+/)) {
        return `const ${node.prop.replace("$", "")} = "${node.value}";`;
      }
      return `${node.prop}: ${transformVariable(node.value)};`;
    }
    case "rule": {
      const declarations: string[] = node.nodes.map(v => traverse(v, indentLevel+1));
      let [element, name] = node.selector.split(/\.|#/);
      const styledFnType = `styled.${element || "div"}`;
      return buildDefinition(indentLevel ? node.selector : name, styledFnType, declarations, indentLevel);
    }
    case "comment": {
      return "";
    }
  }
};

export const traverse2 = (node: Node): string => {
  if (Array.isArray(node.value)) {
    return node.value.map((v) => {
      switch(v.type) {
        case "rule": {
          return traverse2(v);
        }
        case "atrule": {
        }
      }
    }).join("");
  } else {
    return node.value;
  }
};
