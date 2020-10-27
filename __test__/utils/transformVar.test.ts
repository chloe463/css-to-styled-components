import { transformVariable } from "../../src/utils/transformVar";

describe("transformVariable", () => {
  it ("can transform scss var to js var", () => {
    expect(transformVariable("$a-b-c")).toBe("${aBC}");
  })
})
