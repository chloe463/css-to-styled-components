import { ChildNode } from "postcss";
import { capitalize } from "./utils/cases";

export const traverse = (node: ChildNode) => {
  switch (node.type) {
    case "atrule": {
      return;
    }
    case "decl": {
      if (node.prop.match(/^\$[a-zA-Z0-9]+/)) {
        return `const ${node.prop.replace("$", "")} = "${node.value}";`;
      }
      return `  ${node.prop}: ${node.value};`;
    }
    case "rule": {
      const declarations: (string | undefined)[] = node.nodes.map(traverse)
      let [element, name] = node.selector.split(/\.|#/);
      console.log({ element, name });
      const styledFnType = `styled.${element || "div"}`;
      return [
        `const ${capitalize(name)} = ${styledFnType}`,
        ...declarations,
        `\`;`,
      ].join("\n");
    }
    case "comment": {
      return;
    }
  }
};
