import Index from "./index";
import NotebookNav from "./notebookNav";

describe("Components: NotebookNav index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(NotebookNav);
  });
});
