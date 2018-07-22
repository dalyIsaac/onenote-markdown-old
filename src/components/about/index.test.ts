import About from "./about";
import Index from "./index";

describe("Components: About index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(About);
  });
});
