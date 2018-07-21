import Index from "./index";
import UsersComponent from "./usersComponent";

describe("Components: UsersComponent index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(UsersComponent);
  });
});
