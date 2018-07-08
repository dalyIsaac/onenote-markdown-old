import Index from "./index";
import NotebookPicker from "./notebookPicker";

describe("Components: NotebookPicker index.ts", () => {
  test("Ensures that index.ts has the correct default export", () => {
    expect(Index).toBe(NotebookPicker);
  });
});
