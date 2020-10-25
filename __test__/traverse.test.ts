import { Declaration, Rule } from "postcss";
import { traverse } from "../src/traverse";

describe("traverse", () => {
  describe("can transform css decl to styled-components", () => {
    it ("transform variable decl", () => {
      const node = new Declaration({ prop: "$color", value: "black" });
      expect(traverse(node)).toMatchSnapshot();
    });
  });
  describe("can transform css rule to styled-components", () => {
    it ("with no element", () => {
      const node = new Rule({
        selector: ".Klass",
        nodes: [
          new Declaration({ prop: "background-color", value: "rgba(0, 0, 0, 0.86)" }),
          new Declaration({ prop: "color", value: "rgb(255, 255, 255)" }),
        ]
      });
      const result = traverse(node);
      expect(result).toMatchSnapshot();
    });

    it ("with element", () => {
      const node = new Rule({
        selector: "p.message",
        nodes: [
          new Declaration({ prop: "background-color", value: "rgba(0, 0, 0, 0.86)" }),
          new Declaration({ prop: "color", value: "rgb(255, 255, 255)" }),
        ]
      });
      const result = traverse(node);
      expect(result).toMatchSnapshot();
    });
  });
});
