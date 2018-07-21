import Index from "./index";
import NavItemContext from "./navItemContext";

describe("Components: NavItemContext index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(NavItemContext);
  });
});
