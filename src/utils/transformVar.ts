import { kebabToCamel } from "./cases";
export const transformVariable = (s: string): string => {
  return s.replace(/^\$([a-zA-Z0-9-]+)/, (_, p) => {
    return `$\{${kebabToCamel(p)}\}`;
  });
};
