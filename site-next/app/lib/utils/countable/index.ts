const countable = (number: number, words: [string, string, string]) => {
  if ((number % 100 >= 5 && number % 100 <= 20) || number % 10 >= 5)
    return words[2]

  if (number % 10 === 1)
    return words[0]

  return words[1]
}


export default countable
