import Index from "./index";
import NavItem from "./navItem";

describe("Components: NavItem index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(NavItem);
  });
});
