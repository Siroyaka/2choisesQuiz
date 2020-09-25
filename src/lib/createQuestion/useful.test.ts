import { createRamdomCollect } from './useful';

test('test createRandomCollect... collect value', () => {
  const collectValue = 'valueA';
  const values = createRamdomCollect(collectValue, ['B', 'C']);
  expect(values.choise[values.collectIndex]).toBe(collectValue);
});

test('test createRandomCollect... wrong values', () => {
  const collectValue = 1;
  const wrongValues = [2, 3, 4, 5, 8, 10, 20];
  const target = createRamdomCollect(collectValue, [...wrongValues]);
  const wrongs: number[] = [...target.choise];
  wrongs.splice(target.collectIndex, 1);
  wrongs.sort((x, y) => x - y);
  expect(wrongs).toEqual(wrongValues);
})