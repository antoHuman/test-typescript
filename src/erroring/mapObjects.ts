export {}

{
  type TMapper<T extends string | number | symbol, OV> = <NV>(
    entry: [key: T, oldValue: OV],
  ) => [key: T, newValue: NV];

  const mapObjects = <
    K extends string | number | symbol,
    T,
    O extends Record<K, T>,
    M extends TMapper<K, T>,
  >(
    object: O,
    mapper: M,
  ): { [K1 in K]: ReturnType<M>[1] } => {
    const oldEntries = Object.entries<T>(object) as [K, T][];
    const mappedEntries = oldEntries.map<[K, T]>(mapper);
    const value = Object.fromEntries(mappedEntries) as {
      [K1 in K]: ReturnType<M>[1];
    };
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, ([k, z]) => [k, z + 1]);
}

{
  type TMapper<T extends string | number | symbol> = <OV, NV>(
    entry: [key: T, oldValue: OV],
  ) => [key: T, newValue: NV];

  const mapObjects = <
    K extends string | number | symbol,
    T,
    O extends Record<K, T>,
    M extends TMapper<K>,
  >(
    object: O,
    mapper: M,
  ): { [K1 in K]: ReturnType<M>[1] } => {
    const oldEntries = Object.entries<T>(object) as [K, T][];
    const mappedEntries = oldEntries.map<[K, T]>(mapper);
    const value = Object.fromEntries(mappedEntries) as {
      [K1 in K]: ReturnType<M>[1];
    };
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, ([k, z]) => [k, z + 1]);
}

{
  type TMapper<T extends string | number | symbol, OV extends any> = <NV>(
    entry: [key: T, oldValue: OV],
  ) => [key: T, newValue: NV];

  const mapObjects = <
    K extends string | number | symbol,
    T,
    O extends Record<K, T>,
    M extends TMapper<K, T>,
  >(
    object: O,
    mapper: M,
  ): { [K1 in K]: ReturnType<M>[1] } => {
    const oldEntries = Object.entries<T>(object) as [K, T][];
    const mappedEntries = oldEntries.map<[K, T]>(mapper);
    const value = Object.fromEntries(mappedEntries) as {
      [K1 in K]: ReturnType<M>[1];
    };
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, ([k, z]) => [k, z + 1]);
}

{
  type TBaseObject = { [K: string]: any }
  type TObjValues<TObjectType extends TBaseObject> =
  TObjectType[keyof TObjectType];

  type TMapper<OV extends any, T extends string | number | symbol> = (
    oldValue: OV, key: T,
  ) => any;

  const mapObjects = <
    O extends object,
    M extends TMapper<TObjValues<O>, keyof O >,
  >(
    object: O,
    mapper: M,
  ): { [K1 in keyof O]: ReturnType<M> } => {
    const oldEntries = Object.entries(object);
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);
}

{
  // close enough, even though the single types are not kept
  type TObjValues<TObjectType extends object> =
  TObjectType[keyof TObjectType];

  type TMapper<OV extends any, T extends string | number | symbol> = (
    oldValue: OV, key: T,
  ) => any;

  const mapObjects = <
    O extends object,
    M extends TMapper<TObjValues<O>, keyof O >,
  >(
    object: O,
    mapper: M,
  ): { [K1 in keyof O]: ReturnType<M> } => {
    const oldEntries = Object.entries(object) as [keyof O, TObjValues<O>][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, (z) => {
    if (typeof z === 'number') {
      return z*5
    }
    return z + '5'
  }) // not able to distinguish

}

{
  // close enough, even though the single types are not kept
  type TObjValues<TObjectType extends object> =
  TObjectType[keyof TObjectType];

  type TMapper<OV extends any, T extends string | number | symbol> = (
    oldValue: OV, key: T,
  ) => any;

  const mapObjects = <
    O extends object,
    M extends TMapper<O[keyof O], keyof O >,
  >(
    object: O,
    mapper: M,
  ): { [K1 in keyof O]: ReturnType<M> } => {
    const oldEntries = Object.entries(object) as [keyof O, TObjValues<O>][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, (z) => {
    if (typeof z === 'number') {
      return z*5
    }
    return z + '5'
  }) // not able to distinguish

  const isNumber = (x: unknown): x is number => typeof x === 'number';
  const mapper2 = <Z extends number | string>(z: Z): Z extends number ? number : string => {
    if (isNumber(z)) {
      return (z*5) as Z extends number ? number : string
    }
    return z + '5' as Z extends number ? number : string
  } // it gets fixed here for some reason
  function mapper3 <Z extends number | string>(z: Z): Z extends number ? number : string {
    if (isNumber(z)) {
      return (z*5) as Z extends number ? number : string
    }
    return z + '5' as Z extends number ? number : string
  }

  function mapper4 (z: string): string
  function mapper4 (z: number): number
  function mapper4 (z: number | string ): number | string {
    if (isNumber(z)) {
      return (z*5)
    }
    return z + '5'
  }

  function mapper5 <Z>(z: Z ): Z extends number ? number : string {
    if (isNumber(z)) {
      return (z*5) as any
    }
      return z + '5' as any
  }
  function mapper6 <Z extends number | string>(z: Z ): Z extends number ? number : string {
    if (isNumber(z)) {
      return (z*5) as any
    }
      return z + '5' as any
  }

  const to9 = mapObjects(to5, mapper2) // not able to distinguish
  const to10 = mapObjects(to5, mapper3) // not able to distinguish
  const to11 = mapObjects(to5, mapper4) // unexpected error
  const to12 = mapObjects(to5, mapper5) // any type for prop values
  const to13 = mapObjects(to5, mapper6) // not able to distinguish as always

}

{
  type TObjValues<TObjectType extends object> =
  TObjectType[keyof TObjectType];

  type TMapper = <OV extends any, T extends string | number | symbol>(
    oldValue: OV, key: T,
  ) => any;

  const mapObjects = <
    O extends object,
    X extends {[K1 in keyof O]: any},
    M extends <K extends keyof O>(oldValue: O[K], key: K) => X[K]
  >(
    object: O,
    mapper: M,
  ): { [K1 in keyof O]: ReturnType<M> } => {
    const oldEntries = Object.entries(object) as [keyof O, TObjValues<O>][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, (z) => {
    if (typeof z === 'number') {
      return z*5
    }
    return z + '5'
  }) // not able to distinguish

}

{
  type TObjValues<TObjectType extends object> =
  TObjectType[keyof TObjectType];

  type TMapper = <OV extends any, T extends string | number | symbol>(
    oldValue: OV, key: T,
  ) => any;

  const mapObjects = <
    O extends object,
    M extends <K extends keyof O>(oldValue: O[K], key: K) => any,
    X extends {[K1 in keyof O]: ReturnType<M>},
  >(
    object: O,
    mapper: M,
  ): X => {
    const oldEntries = Object.entries(object) as [keyof O, TObjValues<O>][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, (z) => {
    if (typeof z === 'number') {
      return z*5
    }
    return z + '5'
  }) // not able to distinguish

}

{
  //  another solution that it is unable to distinguish
  const mapObjects = <
    OV,
    NV,
    K extends string | number | symbol
  >(
    object: {[K1 in K]: OV},
    mapper: (value: OV, key: K) => NV,
  ): {[K2 in K]: NV} => {
    const oldEntries = Object.entries(object) as [K, OV][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, <Z extends number | string>(z: Z): Z extends number ? number : string => {
    if (typeof z === 'number') {
      return (z as number)*5
    }
    return z + '5'
  }) // unclear error here

}
{
  // another solution that it is unable to distinguish
  const mapObjects = <
    OV,
    NV,
    K extends string | number | symbol
  >(
    object: {[K1 in K]: OV},
    mapper: (value: OV, key: K) => NV,
  ): {[K2 in K]: NV} => {
    const oldEntries = Object.entries(object) as [K, OV][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, <Z extends number | string>(z: Z): Z extends number ? number : string => {
    if (typeof z === 'number') {
      return (z as number)*5
    }
    return z + '5'
  }) // unclear error here

}

{
  const mapper1 = <Z extends number | string>(z: Z): Z extends number ? number : string => {
    if (typeof z === 'number') {
      return z*5
    }
    return z + '5'
  } // unclear error here

  const isNumber = (x: unknown): x is number => typeof x === 'number';
  const mapper2 = <Z extends number | string>(z: Z): Z extends number ? number : string => {
    if (isNumber(z)) {
      return (z*5) as Z extends number ? number : string
    }
    return z + '5' as Z extends number ? number : string
  } // it gets fixed here for some reason
  function mapper3 <Z extends number | string>(z: Z): Z extends number ? number : string {
    if (isNumber(z)) {
      return (z*5) as Z extends number ? number : string
    }
    return z + '5' as Z extends number ? number : string
  }

  function mapper4 (z: string): string
  function mapper4 (z: number): number
  function mapper4 (z: number | string ): number | string {
    if (isNumber(z)) {
      return (z*5)
    }
    return z + '5'
  }
  const mapObjects = <
    OV,
    NV,
    K extends string | number | symbol
  >(
    object: {[K1 in K]: OV},
    mapper: (value: OV, key: K) => NV,
  ): {[K2 in K]: NV} => {
    const oldEntries = Object.entries(object) as [K, OV][];
    const mappedEntries = oldEntries.map(([key, value]) => ([key, mapper(value, key)]));
    const value = Object.fromEntries(mappedEntries);
    return value;
  };

  const to1 = {
    x: 1,
    y: 2,
  } as const;

  const to2 = mapObjects(to1, (z, k) =>  z + 1);

  const to3 = mapObjects(to1, (z, k) => k + z)
  const to4 = mapObjects(to1, (z, k) => ({z, k}))
  const to5 = {
    x: 'test',
    y: 3,
  } as const;
  const to6 = mapObjects(to5, (z) => z + 'j')
  const to7 = mapObjects(to5, (z) => z * 2) // expected error
  const to8 = mapObjects(to5, mapper2) // not precise type
  const to9 = mapObjects(to5, mapper1) // not precise type
  const to10 = mapObjects<number | string, number| string, keyof typeof to5>(to5, mapper4) // weird error
  
}