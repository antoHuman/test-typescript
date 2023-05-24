// testing object mappers

// this was to test if you can use the ide/editor rename functionality to a type\
// and it would apply to all cases where the property of a type has been used.
// the answer seems to be yes
type T1 = {
  prop11: string;
  prop2: number;
};

type T1Mapped = {
  prop10: string; // was prop1
  prop4: number; // was prop2
};

const mapper1 = (x: T1): T1Mapped => {
  return {
    prop10: x.prop11,
    prop4: x.prop2,
  };
};

const x1: T1 = {
  prop11: "test",
  prop2: 10,
}

const x1Mapped = mapper1(x1);


console.log(x1Mapped.prop10, x1Mapped.prop4)