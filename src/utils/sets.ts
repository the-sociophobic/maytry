const unionSets = <SetItem>(setA: SetItem[], setB: SetItem[]) =>
  Array.from(new Set([
    ...setA,
    ...setB
  ]))

const intersectionSets = <SetItem>(setA: SetItem[], setB: SetItem[]) =>
  setA
    .filter(elem => setB.includes(elem))

const relativeComplementSets = <SetItem>(setA: SetItem[], setB: SetItem[]) =>
  setA
    .filter(elem => !setB.includes(elem))

const symmetricDifferenceSets = <SetItem>(setA: SetItem[], setB: SetItem[]) =>
  unionSets(
    relativeComplementSets(setA, setB),
    relativeComplementSets(setB, setA),
  )

const toggleInSet = <SetItem>(set: SetItem[], element: SetItem) =>
  set.includes(element) ?
    set.filter(elem => elem !== element)
    :
    [...set, element]

    
export {
  unionSets,
  intersectionSets,
  relativeComplementSets,
  symmetricDifferenceSets,
  toggleInSet,
}
