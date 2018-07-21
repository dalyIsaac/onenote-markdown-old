import { deflateObject, inflateObject } from "./index";

function setUp() {
  const data = {
    "@hi": { hi: 1 },
    "@odata.world": "earth",
    hello: "world",
    thisIsAnObject: {
      childObject: {
        prop2: "foobar"
      },
      prop1: 1,
      prop3: [
        {
          id: "val1"
        },
        {
          id: "val2"
        }
      ]
    }
  };

  const deflatedData = {
    "@hi.hi": 1,
    "@odata.world": "earth",
    hello: "world",
    "thisIsAnObject.childObject.prop2": "foobar",
    "thisIsAnObject.prop1": 1,
    "thisIsAnObject.prop3": ["val1", "val2"]
  };

  const inflatedData = {
    "@hi": { hi: 1 },
    "@odata.world": "earth",
    hello: "world",
    thisIsAnObject: {
      childObject: {
        prop2: "foobar"
      },
      prop1: 1,
      prop3: [{ id: "val1" }, { id: "val2" }]
    }
  };
  return { data, deflatedData, inflatedData };
}

describe("Types: index.ts", () => {
  test("Tests deflateObject", () => {
    const { data, deflatedData } = setUp();
    const target: object = {};
    deflateObject(target, data);
    expect(target).toEqual(deflatedData);
  });

  test("Tests inflateObject", () => {
    const { deflatedData, inflatedData } = setUp();
    const target: object = {};
    inflateObject(target, deflatedData);
    expect(target).toEqual(inflatedData);
  });
});
