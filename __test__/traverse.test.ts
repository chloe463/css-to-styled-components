import { AtRule, Declaration, Rule } from "postcss";
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

    it ("nested rules", () => {
      const node = new Rule({
        selector: "div.container",
        nodes: [
          new Declaration({ prop: "background-color", value: "rgba(0, 0, 0, 0.86)" }),
          new Declaration({ prop: "color", value: "rgb(255, 255, 255)" }),
          new Rule({
            selector: "&:hover",
            nodes: [
              new Declaration({ prop: "background-color", value: "rgba(0, 0, 0, 0.74)" }),
              new Declaration({ prop: "color", value: "rgb(250, 250, 250)" }),
            ],
          }),
          new Rule({
            selector: "span.message",
            nodes: [
              new Declaration({ prop: "font-weight", value: "400" }),
              new Rule({
                selector: "p",
                nodes: [
                  new Declaration({ prop: "color", value: "rgba(0, 0, 0, 0.56)" }),
                  new Rule({
                    selector: "b",
                    nodes: [
                      new Declaration({ prop: "font-weight", value: "600" }),
                      new Declaration({ prop: "color", value: "rgba(0, 0, 0, 0.74)" }),
                    ],
                  }),
                  new Rule({
                    selector: "i",
                    nodes: [
                      new Declaration({ prop: "font-weight", value: "400" }),
                      new Declaration({ prop: "color", value: "rgba(0, 0, 0, 0.74)" }),
                      new Declaration({ prop: "text-decoration", value: "underline" }),
                    ],
                  })
                ],
              }),
            ],
          }),
        ]
      });
      const result = traverse(node);
      expect(result).toMatchSnapshot();
    });

    it ("keyframes", () => {
      const node = new AtRule({
        name: "keyframes",
        params: "anim",
        nodes: [
          new Rule({
            selector: "0%",
            nodes: [
              new Declaration({ prop: "opacity", value: "0" }),
            ],
          }),
          new Rule({
            selector: "100%",
            nodes: [
              new Declaration({ prop: "opacity", value: "1" }),
            ],
          })
        ]
      });
      const result = traverse(node);
      expect(result).toMatchSnapshot();
    })
  });
});
