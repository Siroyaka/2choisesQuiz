export const createRamdomCollect = <T>(collectValue: T, wrongValues: T[]) => {
  const choiseLength = wrongValues.length + 1;
  const collectIndex = Math.floor(Math.random() * choiseLength);
  const spliceValues: T[] = [];

  for(let i = 0; i < choiseLength; i++) {
    if(collectIndex === i){
      spliceValues.push(collectValue);
      continue;
    }
    const target = Math.floor(Math.random() * wrongValues.length);
    const value = wrongValues[target];
    spliceValues.push(value);
    wrongValues.splice(target, 1);
  }

  return({
    collectIndex: collectIndex,
    choise: spliceValues
  })
}
