import { makeRandomAccumulations, SeedValue } from './accumulation';

test('random making test', () => {
  const seedValues: SeedValue[] = [
    {
      max: 5,
      name: '体力',
      min: 1,
    },
    {
      max: 10,
      name: '精神',
      min: 3,
    }
  ]

  const makeFunction = makeRandomAccumulations(seedValues);
  console.log(makeFunction(1));
  console.log(makeFunction(2));
  expect(3).toEqual(3);
})