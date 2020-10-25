export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
export const kebabToCamel = (s: string) => s.replace(/-([a-z])/g, (_, v) => v.toUpperCase());
export const snakeToCamel = (s: string) => s.replace(/_([a-z])/g, (_, v) => v.toUpperCase());
