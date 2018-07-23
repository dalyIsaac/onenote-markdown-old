import Index from "./index";
import Users from "./users";

describe("Components: Users index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(Users);
  });
});
