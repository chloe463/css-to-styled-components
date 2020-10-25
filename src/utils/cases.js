const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, v) => v.toUpperCase());
const snakeToCamel = (s) => s.replace(/_([a-z])/g, (_, v) => v.toUpperCase());

module.exports = {
  capitalize,
  kebabToCamel,
  snakeToCamel,
};
