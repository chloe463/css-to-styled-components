// This function is forked from https://github.com/salesforce-ux/scss-parser/blob/master/lib/stringify.js

import _ from "lodash";
import type { Node } from "scss-parser";
import { kebabToCamel } from "./utils/cases";

type toStringFn = (n: Node) => string;
interface TypeMappings {
  [key: string]: toStringFn;
}

const type: TypeMappings = {
  arguments: (n) =>
    '(' + walkValue(n.value) + ')',
  atkeyword: (n) =>
    '@' + n.value,
  attribute: (n) =>
    '[' + walkValue(n.value) + ']',
  block: (n) =>
    '{' + walkValue(n.value) + '}',
  class: (n) =>
    'export const ' + walkValue(n.value),
  color_hex: (n) =>
    '#' + n.value,
  id: (n) =>
    '#' + walkValue(n.value),
  interpolation: (n) =>
    '#{' + walkValue(n.value) + '}',
  comment_multiline: (n) =>
    '/*' + n.value + '*/',
  comment_singleline: (n) =>
    '//' + n.value,
  parentheses: (n) =>
    '(' + walkValue(n.value) + ')',
  pseudo_class: (n) =>
    ':' + walkValue(n.value),
  psuedo_element: (n) =>
    '::' + walkValue(n.value),
  selector: (n) => {
    walkSelector(n);
    return "";
    // return 'export const ' + walkSelector(n);
  },
  string_double: (n) =>
   `"${n.value}"`,
  string_single: (n) =>
   `'${n.value}'`,
  variable: (n) =>
    '$' + n.value
}

export const walkNode = (node: Node): string => {
  if (type[node.type]) return type[node.type](node)
  if (_.isString(node.value)) return node.value
  if (_.isArray(node.value)) return walkValue(node.value)
  return ''
}

export const walkSelector = (node: Node) => {
  if (_.isArray(node.value)) {
    const ids = node.value
     .filter((v) => v.type === "id")
     .map((v) => _.isArray(v.value) ? v.value[0].value : v.value)
     .join("");
    const classes = node.value.filter((v) => v.type === "class");
    const varName = classes.map(v => _.isArray(v.value) ? kebabToCamel(v.value[0].value as string) : kebabToCamel(v.value)).join("");
    const identifiers = node.value.filter((v) => v.type === "identifier");
    console.log({ varName, ids, identifiers });
    if (ids.length > 0) {
    }
    return "";
  }
};

export const walkValue = (value: string | Node[]) => {
  if (!_.isArray(value)) return ''
  return value.reduce((s, node) => {
    return s + walkNode(node)
  }, '')
}
