import Index from "./index";
import Settings from "./settings";

describe("Components: Settings index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(Settings);
  });
});
