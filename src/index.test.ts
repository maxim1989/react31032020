import prepareContent from "./index";

describe("First tes suit:", () => {
  it("First test case:", () => {
    const element = document.createElement("div");

    element.innerHTML = "test";

    expect(prepareContent("test")).toEqual(element);
  });
});
