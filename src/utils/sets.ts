const unionSets = (setA: string[], setB: string[]) =>
  Array.from(new Set([
    ...setA,
    ...setB
  ]))

const intersectionSets = (setA: string[], setB: string[]) =>
  setA
    .filter(elem => setB.includes(elem))

const relativeComplementSets = (setA: string[], setB: string[]) =>
  setA
    .filter(elem => !setB.includes(elem))

const symmetricDifferenceSets = (setA: string[], setB: string[]) =>
  unionSets(
    relativeComplementSets(setA, setB),
    relativeComplementSets(setB, setA),
  )

const toggleInSet = (set: string[], element: string) =>
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
