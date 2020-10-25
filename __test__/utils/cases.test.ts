import { capitalize, kebabToCamel, snakeToCamel } from "../../src/utils/cases";

describe("capitalize", () =>{
  it ("Capitalize given string", () => {
    expect(capitalize("abc")).toBe("Abc");
    expect(capitalize("Abc")).toBe("Abc");
    expect(capitalize("aBC")).toBe("ABC");
    expect(capitalize("ABC")).toBe("ABC");
  });
});

describe("kebebToCamel", () =>{
  it ("Transform given kebab case string to camel case", () => {
    expect(kebabToCamel("a-b-c")).toBe("aBC");
    expect(kebabToCamel("a-bc")).toBe("aBc");
    expect(kebabToCamel("abc")).toBe("abc");
  });
});

describe("snakeToCamel", () =>{
  it ("Transform given snake case string to camel case", () => {
    expect(snakeToCamel("a_b_c")).toBe("aBC");
    expect(snakeToCamel("a_bc")).toBe("aBc");
    expect(snakeToCamel("abc")).toBe("abc");
  });
});
