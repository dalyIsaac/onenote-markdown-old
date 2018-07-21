import Index from "./index";
import LoadingNavItem from "./loadingNavItem";

describe("Components: LoadingNavItem index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(LoadingNavItem);
  });
});
