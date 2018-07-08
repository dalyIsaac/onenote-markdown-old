import AddNavItem from "./addNavItem";
import Index from "./index";

describe("Components: AddNavItem index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(AddNavItem);
  });
});
