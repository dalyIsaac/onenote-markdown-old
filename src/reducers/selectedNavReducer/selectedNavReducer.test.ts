import selectedNavReducer from "./index";

describe("Reducers: selectedNavReducer", () => {
  test("Should return the initial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState: string[] = [];
    expect(selectedNavReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle PUT_SELECTED", () => {
    const intialState: string[] = ["genericstring3", "genericstring4"];
    const order: string[] = [
      "genericstring",
      "genericstring1",
      "genericstring2"
    ];
    const action = {
      order,
      type: "PUT_SELECTED"
    };
    expect(selectedNavReducer(intialState, action)).toEqual(order);
  });
});
